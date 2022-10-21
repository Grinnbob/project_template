export interface IUser {
    id: number
    email: string
    role: UserRole
}

export enum UserRole {
    user = "USER",
    admin = "ADMIN",
}
