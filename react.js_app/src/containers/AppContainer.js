import { useEffect, useState } from "react";
import UserContext from "../UserContext";
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';
import io from 'socket.io-client';

const AppContainer = () => {
    const [loggedInUser, setLoggedInUser] = useState();
    const [users, setUsers] = useState([]);
    const [chats, setChats] = useState([]);

    const socket = io.connect("http://localhost:4000");

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:4000/user');
        const userData = await response.json();
        setUsers(userData);
    }

    const fetchChats = async () => {
        const response = await fetch('http://localhost:4000/chat');
        const chatData = await response.json();
        setChats(chatData);
    }

    useEffect(() => {
        fetchUsers();
        fetchChats();
    }, [])
    
    return (
        <UserContext.Provider value={{loggedInUser, users, chats, setLoggedInUser}}>
            <ChatContainer socket={socket}></ChatContainer>
            <UserContainer></UserContainer>
        </UserContext.Provider>
    )
}

export default AppContainer;