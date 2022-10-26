import { useState, useEffect, useContext } from "react";
import FriendsList from "../components/FriendsList";
import Chat from "../components/Chat";
import Search from "../components/Search";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";
import './ChatContainer.css'

const ChatContainer = ({users, socket, fetchChats}) => {

    const [friends, setFriends] = useState([]);
    const {loggedInUser, setLoggedInUser, chats} = useContext(UserContext);

    const navigate = useNavigate()
    
    const [currentChat, setCurrentChat] = useState([]);

    const filteredChats = chats.filter(chat => {
        for (let user of chat.users) {
            console.log(user);
            console.log(loggedInUser);
            return user === loggedInUser._id;
        }
    })

    const addFriend = async (friend) => {
        const response = await fetch(`http://localhost:4000/addfriend/${loggedInUser._id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(friend)
        })
        const friendData = await response.json();
        setLoggedInUser(friendData);
        setFriends(friendData.friends)
        const params = {
            user1_id: loggedInUser._id,
            user2_id: friend._id
        }
        socket.emit("create_chat", params)
        fetchChats()
    }

    const deleteFriend = async (friend) => {
        const response = await fetch(`http://localhost:4000/deletefriend/${loggedInUser._id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(friend)
        })
        const updatedUser = await response.json();
        setLoggedInUser(updatedUser);
        setFriends(updatedUser.friends)
    }

    useEffect (() => {
         setFriends(loggedInUser.friends);
    }, [loggedInUser.friends])
   
    const currentFriendChat = (friendChat) => {
        console.log(friendChat);
        // console.log(friendChat[1]);
        setCurrentChat(friendChat);
        socket.emit("join_chat", friendChat._id);
    }

    const filteredFriends = searchedUser => {
        setFriends(searchedUser)
    }

    const logOut = () => {
        setLoggedInUser()
        navigate('/')
    }

    const updateChat = (newMessage) => {
        setCurrentChat({...currentChat, messages: [...currentChat.messages, newMessage]})
    }

    return (
        <>
            <header className="chat-header">
                <p>You are logged in as {loggedInUser.username}</p>
                <button onClick={logOut}>Log Out</button>
            </header>
            <main className="chat-main">
                <section id="friends-list-section">
                    <Search filteredFun={filteredFriends} addFriend={addFriend} />
                    {/* <AddFriend users={users}/> */}
                    <h3>Friends List</h3>
                    <FriendsList friends={friends} filteredChats={filteredChats} currentFriendChat={currentFriendChat} deleteFriend={deleteFriend} />
                </section>
                <section>
                    {currentChat && currentChat.length !== 0 ? <Chat socket={socket} currentChat={currentChat} updateChat={updateChat}/> : <></>}  
                </section>
            </main>        
        </>
    )
}

export default ChatContainer;
