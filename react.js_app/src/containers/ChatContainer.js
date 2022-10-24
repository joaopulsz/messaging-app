import { useState } from "react";

const ChatContainer = ({loggedInUser, setLoggedInUser, users, chats, socket}) => {

    const [friends, setFriends] = useState([]);
    setFriends(loggedInUser.friends);

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

    const addFriend = async (friend) => {
        const response = await fetch(`http://localhost:4000/addfriend/${loggedInUser.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(friend)
        }) 
        const friendData = await response.json();
        // come back to when logged in user is set up
        setLoggedInUser();
    }

    const currentFriendChat = (friendChat) => {
        setCurrentChat(friendChat[0].messages);
    }

    return (
        <>
            <Search/>
            <AddFriend users={users}/>
            <FriendsList friends={friends} filteredChats={filteredChats} currentFriendChat={currentFriendChat}/>
            <Chat socket={socket} currentChat={currentChat}/>
        </>
    );

}

export default ChatContainer;
