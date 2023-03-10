import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUserCase } from '../search-gyms-ts'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  return new SearchGymsUserCase(gymsRepository)
}
