import { HttpRequest, httpResponse } from '../protocols'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<httpResponse> {
    const requiredFields = ['brandId', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[`${field}`]) {
        return { body: `Missing param ${field}`, statusCode: 400 }
      }
    }

    return { body: {}, statusCode: 200 }
  }
}
