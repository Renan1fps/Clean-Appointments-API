import { AddAccount } from '../domain/use-cases/add-account'
import { HttpRequest, httpResponse, EmailValidator } from '../protocols'

export class SignUpController {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly createUserUsecase: AddAccount
  ) { }

  async handle (httpRequest: HttpRequest): Promise<httpResponse> {
    const { email, password, brandId } = httpRequest.body
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

    const response = await this.createUserUsecase.execute({ email, password, brandId })

    return { body: response, statusCode: 200 }
  }
}
