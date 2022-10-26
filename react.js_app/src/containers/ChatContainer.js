import { useState, useEffect, useContext } from "react";
import FriendsList from "../components/FriendsList";
import Chat from "../components/Chat";
import Search from "../components/Search";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";
import './ChatContainer.css'

const ChatContainer = ({socket, fetchChats}) => {

    const [friends, setFriends] = useState([]);
    const {loggedInUser, setLoggedInUser, chats, users} = useContext(UserContext);

    const navigate = useNavigate()
    
    const [currentChat, setCurrentChat] = useState({
        users: [],
        messages: []
    });
    const [isDelete, setIsDelete] = useState(false)

    const filteredChats = chats.filter(chat => {
        return chat.users.findIndex(user => user._id === loggedInUser._id) !== -1
    })

    const addFriend = async (friend) => {
        const response = await fetch(`http://localhost:4000/addfriend/${loggedInUser._id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(friend)
        })
        const friendData = await response.json();
        if(friendData && friendData.message) return
        setLoggedInUser(friendData);
        setFriends(friendData.friends)
        const params = {
            user1_id: loggedInUser._id,
            user2_id: friend._id
        }
        socket.emit("create_chat", params)
        fetchChats()
        setIsDelete(false)
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
        deleteChat(friend)
        fetchChats()
        setIsDelete(true)
    }

    const deleteChat = async friend => {
        const chat = filteredChats.find(chat => {
            return chat.users.findIndex(user => user._id === friend._id) !== -1
        })
        await fetch(`http://localhost:4000/chat/${chat._id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
    }

    useEffect (() => {
         setFriends(loggedInUser.friends);
    }, [loggedInUser.friends])

    useEffect(() => {
        fetchChats()
    }, [loggedInUser.friends.length, currentChat.messages])
   
    const currentFriendChat = (friendChat) => {
        if(chats.findIndex(chat => chat._id === friendChat._id) !== -1){
            setIsDelete(false)
            setCurrentChat(friendChat);
            socket.emit("join_chat", friendChat._id);
        }
    }

    useEffect(() => {
        if(isDelete){
            setCurrentChat({
                users: [],
                messages: []
            })
        }
    },[isDelete])

    const filteredFriends = searchedUser => {
        setFriends(searchedUser)
    }

    const logOut = () => {
        setLoggedInUser()
        navigate('/')
    }

    const updateChat = (newMessage) => {
        const chatId = chats.findIndex(chat => chat._id === currentChat._id)
        const chat = chats[chatId]
        setCurrentChat({...chat, messages: [...chat.messages, newMessage]})
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
                    {currentChat && currentChat.users.length > 0 ? <Chat socket={socket} currentChat={currentChat} updateChat={updateChat}/> : <></>}  
                </section>
            </main>        
        </>
    )
}

export default ChatContainer;
