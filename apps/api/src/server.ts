import Fastify from "fastify";
import formData from "@fastify/formbody";
import userRoute from "./modules/user/userRouter";
import todoRoute from "./modules/todo/todoRouter";

const fastify = Fastify({
  logger: {
    level: "info",
  },
});

fastify.register(formData);

fastify.register(userRoute);
fastify.register(todoRoute);

const start = async () => {
  try {
    await fastify.listen({ port: 8080 });
    console.log("Running on port 8080");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
