import type { FastifyReply, FastifyRequest } from "fastify";
import { createUserService, deleteUser, findUserById, getUsers, updateUser } from "./users.services.js";
import type { User } from "./users.models.js";

export const getUsersController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    // @ts-ignore
    const { name } = req.params;
    console.log(name);

    const rows = await getUsers(name);

    return reply.status(200).send({
      message: "Users",
      data: rows as User[]
    });
  }
  catch (error) {
    console.error(error);
    return reply.status(500).send({
      message: "Error to list users!"
    });
  }
}

export const findUserController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    // @ts-ignore
    const { id } = req.params;

    const row = await findUserById(id);

    return reply.status(200).send({
      message: "Users",
      data: row as User
    });
  }
  catch (error) {
    console.error(error);
    return reply.status(500).send({
      message: "User not found!"
    });
  }
}

export const updateUserController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    // @ts-ignore
    const { id } = req.params;
    // @ts-ignore
    const { name, email } = req.body;

    if (!id || !name || !email) {
      return reply.status(400).send({
        message: "Invalid data!"
      });
    }

    const row = await findUserById(id);

    if (!row) {
      return reply.status(404).send({
        message: "User not found!"
      });
    }

    await updateUser(name, email, id);

    return reply.status(200).send({
      message: "User updated"
    });
  }
  catch (error) {
    console.error(error);
    return reply.status(500).send({
      message: "Error to update user!"
    });
  }
}

export const deleteUserController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    // @ts-ignore
    const { id } = req.params;

    await deleteUser(id);

    return reply.status(200).send({
      message: "User deleted"
    });
  }
  catch (error) {
    console.error(error);
    return reply.status(500).send({
      message: "Error to delete user!"
    });
  }
}

export const createUserController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    // @ts-ignore
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return reply.status(400).send({
        message: "Invalid data!"
      });
    }

    await createUserService(name, email, password);

    return reply.status(201).send({
      message: "User created"
    });
  }
  catch (error) {
    console.error(error);
    return reply.status(500).send({
      message: "Error to create user!"
    });
  }
}