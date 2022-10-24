import { useState } from "react";

const Registration = ({addUser}) => {
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
            if (match){
                event.preventDefault();
                addUser(newUser);
                setNewUser({
                    username: "", 
                    email: "",
                    password:"",
                    confirmPassword:""    
                })
                setMatch(false);
        }
    }

        const checkPassword = event =>{
            if (newUser.password === event.target.value){
                setMatch(true);
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

            <label htmlFor="password">Password (minimum 8 characters): </label>
            <input id="password" type="password" name="password" 
            placeholder="Password" value={newUser.password} minlength="8" required onChange={handleChange}/>

            <label htmlFor="confirm_password">Confirm Password: </label>
            <input id="confirm_password" type="password" name="confirmPassword" 
            placeholder="Confirm Password" value={newUser.confirmPassword} minlength="8" 
            required onChange={handleChange} onKeyUp={checkPassword}/>
            { newUser.confirmPassword !== "" ?
                <>
                {match? <p>Password matches</p> : <p>Password doesn't match</p>}
                </>
             : <p className="hidden"></p>}

            <input id="create-account-btn" type="submit" value="Create Account" />

        
        </form>

        <a href="/">Log in</a>

        </div>
    );

}

export default Registration;