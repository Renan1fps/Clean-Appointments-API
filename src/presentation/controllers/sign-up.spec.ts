import { EmailValidator } from '../protocols'
import { SignUpController } from './signUp'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorMock implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorMock()
}

const makeSut = (): any => {
  const emailValidator = makeEmailValidator()
  const sut = new SignUpController(emailValidator)
  return {
    emailValidator,
    sut
  }
}

describe('SignUp-Controller', () => {
  test('Should return 400 if email is not provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        password: 'any_value',
        passwordConfirmation: 'any_value',
        brandId: 'any_value'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual('Missing param email')
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if password is not provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_value',
        passwordConfirmation: 'any_value',
        brandId: 'any_value'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual('Missing param password')
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if passwordConfirmation is not provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_value',
        password: 'any_value',
        brandId: 'any_value'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual('Missing param passwordConfirmation')
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if brandId is not provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_value',
        password: 'any_value',
        passwordConfirmation: 'any_value'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual('Missing param brandId')
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if email is not valid', async () => {
    const { sut, emailValidator } = makeSut()

    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        email: 'any_value',
        password: 'any_value',
        passwordConfirmation: 'any_value',
        brandId: 'any_value'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual('Invalid Param')
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should throw error if emailValidator throws', async () => {
    const { sut, emailValidator } = makeSut()

    jest.spyOn(emailValidator, 'isValid').mockImplementationOnce(() => { throw new Error() })

    const httpRequest = {
      body: {
        email: 'any_value',
        password: 'any_value',
        passwordConfirmation: 'any_value',
        brandId: 'any_value'
      }
    }
    const output = sut.handle(httpRequest)
    await expect(output).rejects.toThrow()
  })
})
