import { FastifyInstance } from "fastify";
import { getTask, createTask, updateTask, deleteTask } from "./todoController";
import authenticate from "../middleware/authenticate";

const todoRoute = async (fastify: FastifyInstance) => {
  try {
    fastify.addHook("preHandler", authenticate);

    fastify.get("/api/task", getTask);

    fastify.post(
      "/api/create",
      {
        schema: {
          body: {
            type: "object",
            properties: {
              task: { type: "string" },
            },
            required: ["task"],
          },
        },
      },
      createTask
    );

    fastify.put(
      "/api/update",
      {
        schema: {
          body: {
            type: "object",
            properties: {
              task: { type: "string" },
            },
            required: ["task"],
          },
        },
      },
      updateTask
    );

    fastify.delete(
      "/api/delete",
      {
        schema: {
          body: {
            properties: {
              task: { type: "string" },
            },
          },
        },
      },
      deleteTask
    );
  } catch (error) {
    console.error(error);
  }
};

export default todoRoute;
