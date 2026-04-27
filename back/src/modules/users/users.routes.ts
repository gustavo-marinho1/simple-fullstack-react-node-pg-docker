import type { FastifyInstance } from "fastify";
import { createUserController, deleteUserController, findUserController, getUsersController, updateUserController } from "./users.controllers.js";

export const usersRoutes = async (server: FastifyInstance) => {
  server.get("/users", getUsersController);
  server.get("/users/:id", findUserController);
  server.put("/users/:id", updateUserController);
  server.delete("/users/:id", deleteUserController);
  server.post("/users", createUserController);
}