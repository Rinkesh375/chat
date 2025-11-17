import { db } from "@/db";
import { agents } from "@/db/schema";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      try {
        const [result] = await db.select().from(agents).where(eq(agents.id, id));
        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Something went wrong while fetching agent by ${id}`,
        });
      }
    }),
  getMany: protectedProcedure.query(async () => {
    try {
      const result = await db.select().from(agents);
      return result;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while fetching agents",
      });
    }
  }),
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const [createdAgent] = await db
          .insert(agents)
          .values({
            ...input,
            userId: ctx.auth.user.id,
          })
          .returning();

        return createdAgent;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while creating a new agent",
        });
      }
    }),
});
