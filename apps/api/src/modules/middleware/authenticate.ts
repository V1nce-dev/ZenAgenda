import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare module "fastify" {
  interface FastifyRequest {
    user?: any;
  }
}

const protect = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authorizationHeader = request.headers["authorization"];

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new Error("Invalid or missing token");
    }

    const token = authorizationHeader.substring(7);

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (error, decodedToken) => {
        if (error) {
          throw new Error("Invalid token");
        } else {
          request.user = decodedToken;
        }
      }
    );
  } catch (error) {
    reply.code(401).send({ error: "Unauthorized" });
  }
};

export default protect;
