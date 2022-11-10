export class SignUpController {
  async handle (httpRequest): Promise<any> {
    return { body: 'Missing param email', statusCode: 400 }
  }
}
