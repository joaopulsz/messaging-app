import { useContext} from "react";
import UserContext from "../UserContext";
import Registration from "../components/Registration";
import Login from "../components/Login";
import {Routes, Route} from 'react-router-dom';

const UserContainer = ({addUser}) => {
    const {setLoggedInUser} = useContext(UserContext);

    const fetchLogIn = async user => {
        const response = await fetch("http://localhost:4000/login",{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        const savedUser = await response.json();
        setLoggedInUser(savedUser);
        return savedUser
    }

    return (
        <>
        <Routes>
            <Route path='signup' element={<Registration addUser={addUser}/>}/>
            <Route path='/' element={<Login fetchLogIn={fetchLogIn} />}/>
        </Routes>
        </>
    )
}

export default UserContainer;