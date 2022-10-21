import { createAsyncThunk } from "@reduxjs/toolkit"
import { IAuthRequest } from "../../models/request/AuthRequest"
import AuthService from "../../services/AuthService"

export const login = createAsyncThunk(
    "auth",
    async (payload: IAuthRequest, thunkAPI) => {
        try {
            const response = await AuthService.login(
                payload.email,
                payload.password
            )
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue("Login error")
        }
    }
)

export const signup = createAsyncThunk(
    "auth",
    async (payload: IAuthRequest, thunkAPI) => {
        try {
            const response = await AuthService.signup(
                payload.email,
                payload.password
            )
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue("Signup error")
        }
    }
)

export const logout = createAsyncThunk("auth", async (_, thunkAPI) => {
    try {
        const response = await AuthService.logout()
        return response
    } catch (e) {
        return thunkAPI.rejectWithValue("Logout error")
    }
})
