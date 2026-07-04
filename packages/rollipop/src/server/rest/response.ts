import type { FastifyReply } from 'fastify';

export function sendNotFound(reply: FastifyReply, message: string) {
  return reply.status(404).send({
    error: {
      code: 'NOT_FOUND',
      message,
    },
  });
}
