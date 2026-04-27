import api from "../lib/api";

type User = {
  id: string,
  name: string,
  email: string,
  created_at: string
}

type CreateUser = {
  name: string,
  email: string,
  password: string
}

type UpdateUser = {
  name: string,
  email: string,
}

async function findUsers(name?: string) {
  const response = await api.get("/users", { params: { name } });
  return {
    message: response.data.message as string,
    data: response.data.data as User[]
  }
}

async function findUserById(id: string) {
  const response = await api.get(`/users/${id}`);
  return {
    message: response.data.message as string,
    data: response.data.data as User
  }
}

async function createUser(user: CreateUser) {
  const response = await api.post("/users", user);
  return {
    message: response.data.message as string
  }
}

async function updateUser(id: string, user: UpdateUser) {
  const response = await api.put(`/users/${id}`, user);
  return {
    message: response.data.message as string
  }
}

async function deleteUser(id: string) {
  const response = await api.delete(`/users/${id}`);
  return {
    message: response.data.message as string
  }
}

export {
  findUsers,
  findUserById,
  createUser,
  deleteUser,
  updateUser,
  type User,
  type CreateUser,
  type UpdateUser
}