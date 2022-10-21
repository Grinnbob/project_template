import React from "react"
import { UserRole } from "./models/IUser"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface IRoute {
    path: string
    component: React.FC
    isPrivate: boolean
    roles: UserRole[]
    class?: string
}

const createRoutes = (
    prefix: string,
    defaultRoles: UserRole[],
    defaultIsPrivate: boolean,
    routeParams: Array<PartialBy<IRoute, "isPrivate">>
): IRoute[] => {
    return routeParams.reduce((carry, routeParam) => {
        carry.push({
            path: prefix + routeParam.path,
            component: routeParam.component,
            roles: [...routeParam.roles, ...defaultRoles],
            isPrivate: routeParam.isPrivate || defaultIsPrivate,
            class: routeParam.class,
        })
        return carry
    }, [] as IRoute[])
}

const PublicRoutes: IRoute[] = createRoutes("/", [], false, [
    {
        path: "/login",
        component: LoginPage,
        isPrivate: false,
        roles: [],
        class: "login-page",
    },
    {
        path: "/signup",
        component: SignupPage,
        isPrivate: false,
        roles: [],
        class: "login-page",
    },
])

export const RoutesList: IRoute[] = [...PublicRoutes]
