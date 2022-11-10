export interface AddAccount {
  execute: (account: InputCreateUser) => Promise<OutputCreateUser>
}

export interface InputCreateUser {
  email: string
  password: string
  brandId: string
}

export interface OutputCreateUser {
  id: string
  email: string
  createdAt: string | Date
  brandId: string
}
