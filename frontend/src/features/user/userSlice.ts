import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import type { RootState } from '../../app/store'
import type {
  IUser,
  LoginUserInput,
  LoginUserResponse,
  UserInformation,
} from '../../interfaces/user'
import client from '../../client'

const initialState: IUser = {
  isAuthenticated: false,
  authUser: null,
  isAcceptedRules: false,
}

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async ({ citizenId, laserId }: LoginUserInput) => {
    const loginUserInput = {
      citizenID: citizenId,
      laserID: laserId,
    }
    const { data } = await client.post('/login', loginUserInput)
    return data
  },
)

export const fetchUserInformation = createAsyncThunk(
  'user/fetchUserInformation',
  async () => {
    const token = Cookies.get('token')
    const options = {
      headers: { 'x-api-key': 'HHKITwLzYU1lAwLNj1pO84fT3DBb4b1d4qOMPX0E' },
    }
    const requestBody = { token: token }
    const { data } = await client.post('/verify-token', requestBody, options)
    return data
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthenticated: (state: IUser, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    setAuthUser: (
      state: IUser,
      action: PayloadAction<UserInformation | null>,
    ) => {
      state.authUser = action.payload
    },
    setIsAcceptedRules: (state: IUser, action: PayloadAction<boolean>) => {
      state.isAcceptedRules = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchLogin.fulfilled,
      (state, action: PayloadAction<LoginUserResponse>) => {
        const { Token } = action.payload
        if (Token) {
          state.isAuthenticated = true
          Cookies.set('token', Token)
        }
      },
    )
    builder.addCase(
      fetchUserInformation.fulfilled,
      (state, action: PayloadAction<any>) => {
        const { payload } = action
        state.authUser = payload
      },
    )
    builder.addCase(fetchUserInformation.rejected, (state) => {
      state.isAuthenticated = false
      state.authUser = null
      state.isAcceptedRules = false
      Cookies.remove('token')
    })
  },
})

export const { setIsAuthenticated, setIsAcceptedRules, setAuthUser } =
  userSlice.actions

export const isUserAuthenticated = (state: RootState) =>
  state.user.isAuthenticated
export const authenticatedUser = (state: RootState) => state.user.authUser

export default userSlice.reducer
