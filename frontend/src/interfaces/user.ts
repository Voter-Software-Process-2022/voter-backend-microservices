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
  allowedVoteTopics: number[]
}

export interface IUserLogin {
  citizenId: string
  laserId: string
}
