import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../database/index";
import { eq } from "drizzle-orm";
import { list } from "../../database/schema";

interface ListTable {
  id: number;
  userId: string;
  created_at: Date | null;
  task: string;
}

const getTask = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = request.user.id;

    const userTasks = await db
      .select()
      .from(list)
      .where(eq(list.userId, userId));

    if (!userTasks) {
      return reply.status(404).send({ message: "No posts found" });
    }

    return reply.status(201).send(userTasks);
  } catch (error) {
    console.error(error);
  }
};

const createTask = async (
  request: FastifyRequest<{ Body: ListTable }>,
  reply: FastifyReply
) => {
  try {
    const userId = request.user.id;
    const { task } = request.body;

    const newTask = await db.insert(list).values({ userId, task }).returning();

    if (!newTask) {
      reply.code(401).send({ message: "Could not create task" });
    }

    return reply.code(201).send(newTask);
  } catch (error) {
    console.error(error);
  }
};

const updateTask = async (
  request: FastifyRequest<{ Body: ListTable }>,
  reply: FastifyReply
) => {
  try {
    const userId = request.user.id;
    const { task } = request.body;

    const updatedTask = await db
      .update(list)
      .set({ task })
      .where(eq(list.userId, userId))
      .returning();

    if (!updateTask) {
      reply.code(401).send({ message: "Could not update Task" });
    }

    return reply.code(201).send(updateTask);
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (
  request: FastifyRequest<{ Body: ListTable }>,
  reply: FastifyReply
) => {
  try {
    const userId = request.user.id;

    const deleteTask = await db
      .delete(list)
      .where(eq(list.userId, userId))
      .returning();

    if (!deleteTask) {
      reply.code(401).send("Could not delete Task");
    }

    return reply.code(201).send(deleteTask);
  } catch (error) {
    console.error(error);
  }
};

export { getTask, createTask, updateTask, deleteTask };
