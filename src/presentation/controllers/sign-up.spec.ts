import { AddAccount, InputCreateUser, OutputCreateUser } from '../domain/use-cases/add-account'
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

const makeCreateUserUseCase = (): AddAccount => {
  class CreateUserUseCaseMock implements AddAccount {
    async execute (input: InputCreateUser): Promise<OutputCreateUser> {
      return {
        id: 'any_value',
        email: input.email,
        createdAt: 'any_value',
        brandId: 'any_value'
      }
    }
  }

  return new CreateUserUseCaseMock()
}

const makeSut = (): any => {
  const emailValidator = makeEmailValidator()
  const createUserUseCase = makeCreateUserUseCase()
  const sut = new SignUpController(emailValidator, createUserUseCase)
  return {
    emailValidator,
    createUserUseCase,
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

  test('Should calls email validator with correct value', async () => {
    const { sut, emailValidator } = makeSut()

    const isValidSpy = jest.spyOn(emailValidator, 'isValid')

    const httpRequest = {
      body: {
        email: 'any_value',
        password: 'any_value',
        passwordConfirmation: 'any_value',
        brandId: 'any_value'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
    expect(isValidSpy).toHaveBeenCalledTimes(1)
  })

  test('Should calls create user user-case with correct values', async () => {
    const { sut, createUserUseCase } = makeSut()

    const isValidSpy = jest.spyOn(createUserUseCase, 'execute')

    const httpRequest = {
      body: {
        email: 'any_value',
        password: 'any_value',
        passwordConfirmation: 'any_value',
        brandId: 'any_value'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith({
      email: httpRequest.body.email,
      brandId: httpRequest.body.brandId,
      password: httpRequest.body.password
    })
    expect(isValidSpy).toHaveBeenCalledTimes(1)
  })
})
