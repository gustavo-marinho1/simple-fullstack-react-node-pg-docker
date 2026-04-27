import db from "../../config/db.js"
import type { User } from "./users.models.js";

const getUsers = async (name: string = '', email: string = '') => {
  const params = [];
  let queryParams = 0;

  if (name) {
    params.push(name);
    queryParams++;
  }
  if (email) {
    params.push(email);
    queryParams++;
  }

  let query = `SELECT id, name, email, created_at FROM users`;

  if (queryParams === 1) {
    query += ` WHERE name = $1`;
  } else if (queryParams === 2) {
    query += ` WHERE name = $1 AND email = $2`;
  }

  const data = await db.query(query, params);
  return data.rows as User[];
}

const findUserById = async (id: string) => {
  const data = await db.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]);
  return data.rows[0] as User;
}

const updateUser = async (name: string, email: string, id: string) => {
  db.query(`
    UPDATE users SET name = $1, email = $2 WHERE id = $3
  `, [name, email, id]);
}

const deleteUser = async (id: string) => {
  db.query(`DELETE FROM users WHERE id = $1`, [id]);
}

const createUserService = async (name: string, email: string, password: string) => {
  db.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
  `, [name, email, password]);
}

const createUsersTable = async () => {
  db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export {
  getUsers,
  findUserById,
  updateUser,
  deleteUser,
  createUserService,
  createUsersTable
}