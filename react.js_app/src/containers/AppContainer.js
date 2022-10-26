import { useEffect, useState } from "react";
import UserContext from "../UserContext";
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';
import io from 'socket.io-client';
import {Routes, Route} from 'react-router-dom';

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
        fetchChats();
    }, [])
    



    return loggedInUser && loggedInUser.username ? (
        // if logged in, open chat page
        <UserContext.Provider value={{loggedInUser, users, chats, setLoggedInUser}}>
            <Routes>
                <Route path='/chat' element={<ChatContainer socket={socket} fetchChats={fetchChats}/>}/>
            </Routes>
        </UserContext.Provider>
        // else, 
    ) : (
        <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
            <UserContainer addUser={addUser}/> 
        </UserContext.Provider>
        )
}

export default AppContainer;
