export class LateCheckInValidationError extends Error {
  constructor() {
    super('The check-in can only validate between 20 minutes after creation')
  }
}
