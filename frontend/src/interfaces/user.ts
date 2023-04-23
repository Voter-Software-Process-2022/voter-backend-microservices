export interface UserInformation {
  citizenID: number
  name: string
  lastname: string
  dateOfBirth: string
  location: string
  nationality: string
  religion: string
  hasRight: boolean
}

export interface IUser {
  isAuthenticated: boolean
  authUser: UserInformation | null
  isAcceptedRules: boolean
}

export interface IUserLogin {
  citizenId: string
  laserId: string
}

export interface LoginUserInput {
  citizenId: string
  laserId: string
}

export interface LoginUserResponse {
  Token: string
}
