export interface RequestLoginDto {
  username: string
  password: string
}

export interface RequestSignupDto {
  username: string
  password: string
  role: string
}

export interface RequestUpdateUserDto {
  password?: string
  role?: string
}
