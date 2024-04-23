import { FastifyInstance } from "fastify";
import {
  getUserProfile,
  registerUser,
  authenticateUser,
} from "./userController";
import authenticate from "../middleware/authenticate";

const userRoute = async (fastify: FastifyInstance) => {
  try {
    fastify.get("/api/user", { preHandler: authenticate }, getUserProfile);

    fastify.post(
      "/api/register",
      {
        schema: {
          body: {
            type: "object",
            properties: {
              username: { type: "string" },
              email: { type: "string" },
              password: { type: "string" },
            },
          },
        },
      },
      registerUser
    );

    fastify.post(
      "/api/authenticate",
      {
        schema: {
          body: {
            type: "object",
            properties: {
              email: { type: "string" },
              password: { type: "string" },
            },
          },
        },
      },
      authenticateUser
    );
  } catch (error) {
    console.error(error);
  }
};

export default userRoute;
