import { db } from "@/db";
import { meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constant/constants";
import { meetingsInsertSchema, meetingUpdateSchema } from "../schemas";

export const meetingsRouter = createTRPCRouter({
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

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      try {
        const [existingMeeting] = await db
          .select({
            ...getTableColumns(meetings),
          })
          .from(meetings)
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
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { page, pageSize, search } = input;
        const result = await db
          .select({
            ...getTableColumns(meetings),
          })
          .from(meetings)
          .where(
            and(
              eq(meetings.userId, ctx.auth.user.id),
              search ? ilike(meetings.name, `%${search}%`) : undefined
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
              search ? ilike(meetings.name, `%${search}%`) : undefined
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

        return createdMeeting;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while creating a new meeting",
        });
      }
    }),
});
