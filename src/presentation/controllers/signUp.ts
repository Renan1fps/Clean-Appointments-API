export class SignUpController {
  async handle (httpRequest): Promise<any> {
    if (!httpRequest.body.email) {
      return { body: 'Missing param email', statusCode: 400 }
    }

    if (!httpRequest.body.password) {
      return { body: 'Missing param password', statusCode: 400 }
    }

    if (!httpRequest.body.passwordConfirmation) {
      return { body: 'Missing param passwordConfirmation', statusCode: 400 }
    }

    if (!httpRequest.body.brandId) {
      return { body: 'Missing param brandId', statusCode: 400 }
    }
  }
}
