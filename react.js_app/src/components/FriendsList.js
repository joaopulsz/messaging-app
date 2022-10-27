import { convertLength } from "@mui/material/styles/cssUtils";
import { useContext } from "react";
import UserContext from "../UserContext";
import "./FriendsList.css"

const FriendsList = ({friends, filteredChats, currentFriendChat, deleteFriend}) => {

    const {users, loggedInUser} = useContext(UserContext);

    const handleClick = friend => {
        deleteFriend(friend)
    }

    const friendsList = friends.map(friend => {
        const chat = filteredChats.find(chat => {
            return chat.users.findIndex(user => user._id === friend._id) !== -1
        })

        if (friend) {
            let friendChat;
            for(let chat of filteredChats) {
                if((chat.users[0] === loggedInUser._id || chat.users[1] === loggedInUser._id) && 
                (chat.users[0] === friend._id || chat.users[1] === friend._id)) {
                    friendChat = chat;
                }
            }
            
            return (
            <li key={friend._id} onClick={() => currentFriendChat(chat)}>
                <p>{friend.username}</p>
                <button onClick={() => handleClick(friend)}>Delete Friend</button>
            </li>);
        }
    });
        
    return (
        <div className="friends-list-container">
            <ul className="friends-list">{friendsList}</ul>
        </div>
    );

}

export default FriendsList;