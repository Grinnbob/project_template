import React, { lazy } from "react"
import { UserRole } from "./models/Roles"

import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"

const AccessDeniedPage = lazy(() => import("./pages/AccessDeniedPage"))
const Home = lazy(() => import("./pages/Home"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))

const VacancyCreatePage = lazy(() =>
    import("./pages/recruiter/VacancyCreatePage")
)

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
        component: AccessDeniedPage,
        roles: [],
    },
    {
        path: "/404",
        component: NotFoundPage,
        roles: [],
    },
])

const PrivateRoutes: IRoute[] = createRoutes("/", [UserRole.admin], true, [
    {
        path: "/home",
        component: Home,
        roles: [],
    },
    {
        path: "/vacancy/create",
        component: VacancyCreatePage,
        roles: [UserRole.recruiter, UserRole.admin],
    },
])

export const RoutesList: IRoute[] = [...PublicRoutes, ...PrivateRoutes]
