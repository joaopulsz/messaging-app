import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';

const Registration = ({addUser}) => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState(
        {
            username: "", 
            email: "",
            password:"",
            confirmPassword:""
        }
        );

        const [match, setMatch] = useState(false);

        const handleChange = event => {
            const name = event.target.name;
            const updatedUser = {...newUser}
            updatedUser[name] = event.target.value;
            setNewUser(updatedUser);          
        }

        const handleSubmit = event => {
            event.preventDefault();
            if (match){
                addUser(newUser);
                setMatch(false);          
                setNewUser({
                    username: "", 
                    email: "",
                    password:"",
                    confirmPassword:""    
                })
                navigate('/')
            }
        }

        const checkPassword = event =>{
            if (newUser.password === event.target.value){
                setMatch(true);
            }else{
                setMatch(false)
            }
        }

    return(
        <div className="sign-up">
        {/* logo */}
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" name="email" 
            placeholder="email" value={newUser.email} required onChange={handleChange}/>

            <label htmlFor="username">Username:</label>
            <input id="username" type="text" name="username" 
            placeholder="username" value={newUser.username} required onChange={handleChange}/>

            <label htmlFor="password">Password (minimum 1 characters): </label>
            <input id="password" type="password" name="password" 
            placeholder="Password" value={newUser.password} minLength="1" required onChange={handleChange}/>

            <label htmlFor="confirm_password">Confirm Password: </label>
            <input id="confirm_password" type="password" name="confirmPassword" 
            placeholder="Confirm Password" value={newUser.confirmPassword} minLength="1" 
            required onChange={handleChange} onKeyUp={checkPassword}/>
            { newUser.confirmPassword !== "" ?
                <>
                {match? <p>Password matches</p> : <p>Password doesn't match</p>}
                </>
             : <p className="hidden"></p>}

            <input id="create-account-btn" type="submit" value="Create Account" disabled={newUser.confirmPassword !== '' && match? false: true}/>

        
        </form>
        
        <Link to="/">Log in</Link>

        </div>
    );

}

export default Registration;