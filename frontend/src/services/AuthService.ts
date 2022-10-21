import $api from "../http"
import { IAuthResponse } from "../models/response/AuthResponse"
import { injectable } from "inversify"

@injectable()
export default class AuthService {
    constructor() {}
    static async login(
        email: string,
        password: string
    ): Promise<IAuthResponse> {
        const response = await $api.post<IAuthResponse>("/auth/login", {
            email,
            password,
        })

        return response.data
    }

    static async signup(
        email: string,
        password: string
    ): Promise<IAuthResponse> {
        const response = await $api.post<IAuthResponse>("/auth/signup", {
            email,
            password,
        })

        return response.data
    }

    static async logout(): Promise<void> {
        await $api.get<IAuthResponse>("/auth/logout")
    }

    // async checkAuth(params: type) {}
}
