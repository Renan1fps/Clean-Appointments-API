import { SignUpController } from './signUp'

describe('SignUp-Controller', () => {
  test('Should return 400 if email in not provided', async () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        password: 'any_value',
        passwordConfirmation: 'any_value'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual('Missing param email')
    expect(httpResponse.statusCode).toBe(400)
  })
})
