import { HttpRequest, httpResponse, EmailValidator } from '../protocols'

export class SignUpController {
  constructor (
    private readonly emailValidator: EmailValidator
  ) { }

  async handle (httpRequest: HttpRequest): Promise<httpResponse> {
    const requiredFields = ['brandId', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[`${field}`]) {
        return { body: `Missing param ${field}`, statusCode: 400 }
      }
    }

    const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)

    if (!isValidEmail) {
      return { body: 'Invalid Param', statusCode: 400 }
    }

    return { body: {}, statusCode: 200 }
  }
}
