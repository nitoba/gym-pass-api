import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify()
  } catch (error) {
    return await res.status(401).send({ message: 'unauthorized' })
  }
}
