import { useEffect, useState } from "react";
import UserContext from "../UserContext";
// import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';

const AppContainer = () => {
    const [loggedInUser, setLoggedInUser] = useState();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:4000/user');
        const userData = await response.json();
        setUsers(userData);
    }

    const addUser = async (newUser) => {
        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
        const savedUser = await response.json();
        setUsers([...users, savedUser]);
    }

    useEffect(() => {
        fetchUsers();
    }, [])
    
    return (
        <UserContext.Provider value={{loggedInUser, users, setLoggedInUser}}>
            {/* <ChatContainer /> */}
            <UserContainer addUser={addUser} />
        </UserContext.Provider>
    )
}

export default AppContainer;