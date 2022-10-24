import { useState } from "react"

const Login = ({fetchLogIn}) => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleChange = event => {
        const propertyName = event.target.name
        const copiedUser = {...user}
        copiedUser[propertyName] = event.target.value
        setUser(copiedUser)
    }

    const handleSubmit = event => {
        event.preventDefault()
        fetchLogIn(user)
        setUser({
            username: "",
            password: ""
        })
    }

    return (
        <div className="log-in">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username or Email:</label>
                <input type="text"
                id="log-in-username"
                name="username"
                placeholder="Username or Email"
                onChange={handleChange}
                />

                <label htmlFor="password">Password:</label>
                <input type="password"
                id="log-in-password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                />

                <input id="login-btn" type="submit" value="Login" />
            </form>
            <a href="/">Sign up</a>
        </div>
    )
}

export default Login