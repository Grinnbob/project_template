import $api from "../http"
import { IAuthResponse } from "../models/response/AuthResponse"
import { injectable } from "inversify"
import { AxiosResponse } from "axios"

@injectable()
export default class AuthService {
    constructor() {}
    static async login(
        email: string,
        password: string
    ): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>("/auth/login", {
            email,
            password,
        })
    }

    static async signup(
        email: string,
        password: string
    ): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post("/auth/signup", {
            email,
            password,
        })
    }

    static async logout(): Promise<void> {
        await $api.get("/auth/logout")
    }

    // async checkAuth(params: type) {}
}
