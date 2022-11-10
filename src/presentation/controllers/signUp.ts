export class SignUpController {
  async handle (httpRequest): Promise<any> {
    if (!httpRequest.body.email) {
      return { body: 'Missing param email', statusCode: 400 }
    }

    if (!httpRequest.body.password) {
      return { body: 'Missing param password', statusCode: 400 }
    }
  }
}
