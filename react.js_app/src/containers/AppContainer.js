import { useEffect, useState } from "react";
import UserContext from "../UserContext";
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';

const AppContainer = () => {
    const [loggedInUser, setLoggedInUser] = useState();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:4000/user');
        const userData = await response.json();
        setUsers(userData);
    }

    useEffect(() => {
        fetchUsers();
    }, [])
    
    return (
        <UserContext.Provider value={{loggedInUser, users, setLoggedInUser}}>
            <ChatContainer></ChatContainer>
            <UserContainer></UserContainer>
        </UserContext.Provider>
    )
}

export default AppContainer;