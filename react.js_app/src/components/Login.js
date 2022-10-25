import { useState, useContext } from "react"
import UserContext from "../UserContext";
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

const Login = ({fetchLogIn}) => {
    const navigate = useNavigate()
    const {loggedInUser} = useContext(UserContext);

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
        fetchLogIn(user).then(savedUser => {
            if(savedUser != undefined && savedUser.username) {
                setUser({
                    username: "",
                    password: ""
                })
                navigate('/account')
            }
        })
    }

    return (
        <div className="login">
            <h2>Log In</h2>
            {loggedInUser != undefined && loggedInUser.message ? 
            <p>{loggedInUser.message}</p> :
            <p className="hidden"></p>
            }
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username or Email:</label>
                <input type="text"
                id="login-username"
                name="username"
                placeholder="Username or Email"
                onChange={handleChange}
                />

                <label htmlFor="password">Password:</label>
                <input type="password"
                id="login-password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                />

                <input id="login-btn" type="submit" value="Login" />
                <Link to="/signup">Sign up</Link>
            </form>
        </div>
    )
}

export default Login