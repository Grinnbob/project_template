import React from "react"
import { UserRole } from "./models/IUser"
import AccessDenied from "./pages/AccessDenied"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface IRoute {
    path: string
    component: React.FC
    isPrivate: boolean
    roles: UserRole[]
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
        })
        return carry
    }, [] as IRoute[])
}

const PublicRoutes: IRoute[] = createRoutes("/", [], false, [
    {
        path: "/login",
        component: LoginPage,
        roles: [],
    },
    {
        path: "/signup",
        component: SignupPage,
        roles: [],
    },
    {
        path: "/access_denied",
        component: AccessDenied,
        roles: [],
    },
])

const PrivateRoutes: IRoute[] = createRoutes("/", [], true, [
    {
        path: "/home",
        component: Home,
        roles: [],
    },
])

export const RoutesList: IRoute[] = [...PublicRoutes, ...PrivateRoutes]
