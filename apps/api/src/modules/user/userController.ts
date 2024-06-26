import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../database/index";
import { eq } from "drizzle-orm";
import { users } from "../../database/schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

interface IBody {
  username: string;
  email: string;
  password: string;
}

const generateToken = async (id: string | null) => {
  try {
    if (id) {
      return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "30d",
      });
    }
  } catch (error) {
    throw new Error("Invalid user ID from token generation");
  }
};

const getUserProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = request.user.id;

    if (!userId) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    const userProfile = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (userProfile.length > 0) {
      reply.send(userProfile[0]);
    } else {
      reply.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
};

const registerUser = async (
  request: FastifyRequest<{ Body: IBody }>,
  reply: FastifyReply
) => {
  try {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
      reply.code(401).send("Please enter all fields");
    }

    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (userExists.length > 0) {
      reply.code(401).send("This user already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({ username, email, password: hashPassword })
      .returning();

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      created: user.createdAt,
      token: await generateToken(user.id),
    };

    if (user) {
      return reply.code(201).send({
        payload,
      });
    }
  } catch (error) {
    console.error(error);
    reply.code(500).send("Internal Server Error");
  }
};

const authenticateUser = async (
  request: FastifyRequest<{ Body: IBody }>,
  reply: FastifyReply
) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      reply.code(401).send("Please enter all feilds");
    }

    const result = await db.select().from(users).where(eq(users.email, email));
    const user = result[0];

    const hashPassword = await bcrypt.compare(password, user.password);

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      token: await generateToken(user.id),
    };

    if (user && hashPassword) {
      reply.code(201).send({
        payload,
      });
    } else {
      reply.code(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    reply.code(500).send("Internal Server Error");
  }
};

export { getUserProfile, registerUser, authenticateUser };
