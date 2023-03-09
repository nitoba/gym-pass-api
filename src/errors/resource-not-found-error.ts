export class ResourceNotFoundError extends Error {
  constructor(message?: string) {
    if (message) {
      super(`This resource ${message} could not be found`)
    } else {
      super('This resource could not be found')
    }
  }
}
