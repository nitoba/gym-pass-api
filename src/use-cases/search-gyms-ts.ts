/* eslint-disable no-useless-constructor */
import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

export type SearchGymsUseCaseInput = {
  query: string
  page?: number
}

export type SearchGymsUseCaseResponse = {
  gyms: Gym[]
}

export class SearchGymsUserCase {
  constructor(private gymsRepository: GymsRepository) {}
  async execute({
    query,
    page = 1,
  }: SearchGymsUseCaseInput): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
