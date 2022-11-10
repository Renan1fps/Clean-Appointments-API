import { SignUpController } from './signUp'

describe('SignUp-Controller', () => {
  test('Should return 400 if email is not provided', async () => {
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

  test('Should return 400 if password is not provided', async () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        email: 'any_value',
        passwordConfirmation: 'any_value'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual('Missing param password')
    expect(httpResponse.statusCode).toBe(400)
  })
})
