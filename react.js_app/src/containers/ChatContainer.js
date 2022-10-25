import { useState, useEffect, useContext } from "react";
import FriendsList from "../components/FriendsList";
import Chat from "../components/Chat";
import UserContext from "../UserContext";
import { useUser } from "./AppContainer";

const ChatContainer = ({users, socket}) => {

    const [friends, setFriends] = useState([]);
    const {loggedInUser, setLoggedInUser, chats} = useContext(UserContext);
    // console.log(loggedInUser);

    
    const [currentChat, setCurrentChat] = useState([]);

    const filteredChats = chats.filter(chat => {
        // const chats = [];
        // chat.users.forEach(user => {
        //     if (user.id === loggedInUser.id) {
        //         chats.push(chat);
        //     }
        // })
        // return chats;
        return chat.users.map(user => user.id === loggedInUser.id)
    })

    // const addFriend = async (friend) => {
    //     const response = await fetch(`http://localhost:4000/addfriend/${loggedInUser.id}`, {
    //         method: "PATCH",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify(friend)
    //     }) 
    //     const friendData = await response.json();
    //     // come back to when logged in user is set up
    //     setLoggedInUser();
    // }

    useEffect (() => {
         setFriends(loggedInUser.friends);
    }, [])
   
    const currentFriendChat = (friendChat) => {
        setCurrentChat(friendChat[0].messages);
    }

    return (
        <>
        <p>{loggedInUser.email}</p>
            {/* <Search/> */}
            {/* <AddFriend users={users}/> */}
            <FriendsList friends={friends} filteredChats={filteredChats} currentFriendChat={currentFriendChat}/>
            {/* <Chat socket={socket} currentChat={currentChat} setCurrentChat={setCurrentChat}/> */}
        </>
    );

}

export default ChatContainer;
