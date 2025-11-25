import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constant/constants";
import { meetingsInsertSchema, meetingUpdateSchema } from "../schemas";
import { MeetingStatus } from "../types";
import { streamVideo } from "@/lib/stream-video";
import generatedAvatar from "@/lib/avatar";
import { GeneratedAvatarVariant } from "@/types/generated-avatar";

export const meetingsRouter = createTRPCRouter({
  generateToken: protectedProcedure.mutation(async ({ ctx }) => {
    await streamVideo.upsertUsers([
      {
        id: ctx.auth.user.id,
        name: ctx.auth.user.name,
        role: "admin",
        image:
          ctx.auth.user.image ??
          generatedAvatar({
            seed: ctx.auth.user.name,
            variant: GeneratedAvatarVariant.Initials,
          }),
      },
    ]);
    const expirationTime = Math.floor(Date.now() / 1000) + 3600; //valid token till 1 hour from current time
    const issuedAt = Math.floor(Date.now() / 1000) - 60; // Issued-at timestamp (set 60 seconds in the past to avoid clock skew issues)

    const token = streamVideo.generateUserToken({
      user_id: ctx.auth.user.id,
      exp: expirationTime,
      validity_in_seconds: issuedAt,
    });
    return token;
  }),

  update: protectedProcedure
    .input(meetingUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const [updatedMeeting] = await db
        .update(meetings)
        .set(input)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        )
        .returning();
      if (!updatedMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Failed to update meeting by this id:${input.id}`,
        });
      }
      return updatedMeeting;
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [removedMeeting] = await db
        .delete(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        )
        .returning();
      if (!removedMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Failed to delete meeting by this id:${input.id}`,
        });
      }
      return removedMeeting;
    }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      try {
        const [existingMeeting] = await db
          .select({
            ...getTableColumns(meetings),
            agent: agents,
            duration:
              sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as(
                "duration"
              ),
          })
          .from(meetings)
          .innerJoin(agents, eq(meetings.agentId, agents.id))
          .where(
            and(eq(meetings.id, id), eq(meetings.userId, ctx.auth.user.id))
          );

        if (!existingMeeting) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Meeting not found by this id:${id}`,
          });
        }
        return existingMeeting;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Something went wrong while fetching meeting by ${id}`,
        });
      }
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
        agentId: z.string().nullish(),
        status: z
          .enum([
            MeetingStatus.Upcoming,
            MeetingStatus.Active,
            MeetingStatus.Completed,
            MeetingStatus.Processing,
            MeetingStatus.Cancelled,
          ])
          .nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { page, pageSize, search, status, agentId } = input;
        const result = await db
          .select({
            ...getTableColumns(meetings),
            agent: agents,
            duration:
              sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as(
                "duration"
              ),
          })
          .from(meetings)
          .innerJoin(agents, eq(meetings.agentId, agents.id))
          .where(
            and(
              eq(meetings.userId, ctx.auth.user.id),
              search ? ilike(meetings.name, `%${search}%`) : undefined,
              status ? eq(meetings.status, status) : undefined,
              agentId ? eq(meetings.agentId, agentId) : undefined
            )
          )
          .orderBy(desc(meetings.createdAt), desc(meetings.id))
          .limit(pageSize)
          .offset((page - 1) * pageSize);
        const countResult = await db
          .select({ count: count() })
          .from(meetings)
          .where(
            and(
              eq(meetings.userId, ctx.auth.user.id),
              search ? ilike(meetings.name, `%${search}%`) : undefined,
              status ? eq(meetings.status, status) : undefined,
              agentId ? eq(meetings.agentId, agentId) : undefined
            )
          );
        const totalPages = Math.ceil(countResult[0]?.count / pageSize);

        return {
          items: result,
          total: countResult[0]?.count,
          totalPages,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while fetching meetings",
        });
      }
    }),

  create: protectedProcedure
    .input(meetingsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const [createdMeeting] = await db
          .insert(meetings)
          .values({
            ...input,
            userId: ctx.auth.user.id,
          })
          .returning();

        const call = streamVideo.video.call("default", createdMeeting.id);
        await call.create({
          data: {
            created_by_id: ctx.auth.user.id,
            custom: {
              meetingId: createdMeeting.id,
              meetingName: createdMeeting.name,
            },
            settings_override: {
              transcription: {
                language: "en",
                mode: "auto-on",
                closed_caption_mode: "auto-on",
              },
              recording: {
                mode: "auto-on",
                quality: "1080p",
              },
            },
          },
        });

        const [existingAgent] = await db
          .select()
          .from(agents)
          .where(eq(agents.id, createdMeeting.agentId));

        if (!existingAgent) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Agent not found by this agent ID:${createdMeeting.agentId}`,
          });
        }

        await streamVideo.upsertUsers([
          {
            id: existingAgent.id,
            name: existingAgent.name,
            role: "user",
            image: generatedAvatar({
              seed: existingAgent.name,
              variant: GeneratedAvatarVariant.BotttsNeutral,
            }),
          },
        ]);

        return createdMeeting;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while creating a new meeting",
        });
      }
    }),
});
