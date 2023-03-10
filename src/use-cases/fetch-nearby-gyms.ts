/* eslint-disable no-useless-constructor */
import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

export type FetchNearbyGymsInput = {
  userLatitude: number
  userLongitude: number
}

export type FetchNearbyGymsResponse = {
  gyms: Gym[]
}

export class FetchNearbyGymsUserCase {
  constructor(private gymsRepository: GymsRepository) {}
  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsInput): Promise<FetchNearbyGymsResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
