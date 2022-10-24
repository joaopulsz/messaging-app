import { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
// import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';
import io from 'socket.io-client';

const AppContainer = () => {
    const [loggedInUser, setLoggedInUser] = useState({
        "_id": "635282fbfcdcc247674e1b79",
        "username": "User1",
        "email": "User1@chatapp.com",
        "password": "$2a$10$4/Rl6GVWjPfMc9LRIFJqeuB4FwpuSKAJBpGi/.rW85HYkE.X/9b5m",
        "friends": [],
        "createdAt": "2022-10-21T11:31:07.155Z",
        "updatedAt": "2022-10-21T11:31:07.155Z",
        "__v": 0
        });
    const [users, setUsers] = useState([]);
    const [chats, setChats] = useState([]);

    // const socket = io.connect("http://localhost:4000");

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:4000/user');
        const userData = await response.json();
        setUsers(userData);
    }

    const fetchChats = async () => {
        const response = await fetch('http://localhost:4000/chat');
        const chatData = await response.json();
        setChats(chatData);

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
    
    const socket = ""

    return (
        <UserContext.Provider value={{loggedInUser, users, chats, setLoggedInUser}}>
            <ChatContainer socket={socket}></ChatContainer>
            <UserContainer addUser={addUser} />
        </UserContext.Provider>
    )
}

}

export const useUser = () => useContext(UserContext);

export default AppContainer;
