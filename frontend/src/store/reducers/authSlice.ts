import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAuth } from "../../types/authToken"
import { TokenStorage } from "../../utils/tokenStorage"
import { login, logout, signup } from "../action-creators/authActions"

const tokenStorage = new TokenStorage()
const me = localStorage.getItem("me")
    ? JSON.parse(localStorage.getItem("me")!)
    : null

const initialState: IAuth = {
    token: tokenStorage.getToken() || null,
    me,
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<IAuth>) => {
            state.token = action.payload.token
            tokenStorage.setToken(action.payload.token)

            state.me = action.payload.me
            localStorage.setItem("me", JSON.stringify(action.payload.me))
        },
        resetToken: (state) => {
            state.token = null
            tokenStorage.removeToken()
            tokenStorage.removeRefreshToken()

            localStorage.removeItem("me")
        },
    },
    extraReducers: {
        // success
        [login.fulfilled.type]: (state, action: PayloadAction<IAuth>) => {
            state.isLoading = false
            state.me = action.payload.me
            state.error = ""

            tokenStorage.setToken(action.payload.token)
            localStorage.setItem("me", JSON.stringify(action.payload.me))
        },
        // loading
        [login.pending.type]: (state) => {
            state.isLoading = true
        },
        // error
        [login.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },

        // success
        [signup.fulfilled.type]: (state, action: PayloadAction<IAuth>) => {
            state.isLoading = false
            state.me = action.payload.me
            state.error = ""

            tokenStorage.setToken(action.payload.token)
            localStorage.setItem("me", JSON.stringify(action.payload.me))
        },
        // loading
        [signup.pending.type]: (state) => {
            state.isLoading = true
        },
        // error
        [signup.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },

        // success
        [logout.fulfilled.type]: (state) => {
            state.isLoading = false
            state.me = null
            state.error = ""

            tokenStorage.removeToken()
            localStorage.removeItem("me")
        },
        // loading
        [logout.pending.type]: (state) => {
            state.isLoading = true
        },
        // error
        [logout.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    },
})

export const { setToken, resetToken } = authSlice.actions
export default authSlice.reducer
