import Fastify from 'fastify';
import cors from '@fastify/cors';
import { usersRoutes } from './modules/users/users.routes.js';

const server = Fastify();

server.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'PUT', 'POST', 'DELETE']
});

server.register(usersRoutes);

export default server