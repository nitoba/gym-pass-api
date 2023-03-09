/* eslint-disable no-useless-constructor */
import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

export type CreateGymUseCaseInput = {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export type CreateGymUseCaseResponse = {
  gym: Gym
}

export class CreateGymUserCase {
  constructor(private gymsRepository: GymsRepository) {}
  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseInput): Promise<CreateGymUseCaseResponse> {
    // const gymExists = await this.gymsRepository.findByTitle(title)

    // if (gymExists) throw new Error(`${title} already exists`)

    const gym = await this.gymsRepository.create({
      title,
      description,
      latitude,
      longitude,
      phone,
    })

    return { gym }
  }
}
