export class SignUpController {
  async handle (httpRequest): Promise<any> {
    const requiredFields = ['email', 'password', 'passwordConfirmation', 'brandId']

    for (const field of requiredFields) {
      if (!httpRequest.body[`${field}`]) {
        return { body: `Missing param ${field}`, statusCode: 400 }
      }
    }
  }
}
