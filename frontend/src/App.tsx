import React from "react"
import { BrowserRouter as Router, Link } from "react-router-dom"
import { RoutesList } from "./routes"
import "./styles/App.css"
import { genRoutes } from "./utils/genRoutes"

const App: React.FC = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Register</Link>
                    </li>
                    <li>
                        <Link to="/">Main</Link>
                    </li>
                </ul>
            </nav>
            {genRoutes(RoutesList)}
        </Router>
    )
}

export default App
