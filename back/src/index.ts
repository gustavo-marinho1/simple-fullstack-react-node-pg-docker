import db from "./config/db.js";
import { createUsersTable } from "./modules/users/users.services.js";
import server from "./server.js";

async function start() {
  try {
    await db.connect();
    await createUsersTable();

    server.listen({ port: 3334, host: "0.0.0.0" }, () => {
      console.log('Server started on port 3334');
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();