import React from "react"
import { Route, Routes } from "react-router-dom"
import AccessDenied from "../pages/AccessDenied"
import LoginPage from "../pages/LoginP"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IRoute } from "../routes"

export const genRoutes = (routes: IRoute[]) => {
    const me = useTypedSelector((state) => state.auth.me)
    const token = useTypedSelector((state) => state.auth.token)
    const isAuthenticated = !!token
    return (
        <Routes>
            {routes.map((x) => {
                if (x.isPrivate) {
                    if (!isAuthenticated) {
                        return (
                            <Route
                                key={x.path}
                                path={"/login"}
                                element={<LoginPage />}
                            />
                        )
                    }

                    const userHasRequiredRole =
                        me && x.roles.includes(me.role) ? true : false
                    if (isAuthenticated && !userHasRequiredRole) {
                        return (
                            <Route
                                key={x.path}
                                path={x.path}
                                element={<AccessDenied />}
                            />
                        )
                    }
                }
                return (
                    <Route
                        key={x.path}
                        path={x.path}
                        element={<x.component />}
                    />
                )
            })}
        </Routes>
    )
}
