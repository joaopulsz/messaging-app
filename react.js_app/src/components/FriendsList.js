import { convertLength } from "@mui/material/styles/cssUtils";
import { useContext } from "react";
import UserContext from "../UserContext";

const FriendsList = ({friends, filteredChats, currentFriendChat, deleteFriend}) => {

    const {users, loggedInUser} = useContext(UserContext);


    const filteredFriends = [];

    for (let user of users) {
        for (let friend of friends) {
            if (friend === user._id) {
                filteredFriends.push(user);
            }
        }
    }

    const handleClick = friend => {
        deleteFriend(friend)
    }

    // const friendChats = filteredFriends.map(friend => {
        
    // })

    const friendsList = filteredFriends.map(friend => {
        console.log("FRIEND!", filteredChats);
        if (friend) {

            const friendChat = filteredChats.map(chat => {
                if((chat.users[0] === friend._id || chat.users[1] === friend._id) && 
                (chat.users[0] === loggedInUser._id || chat.users[1] === loggedInUser._id)) {
                    return chat;
                }
            })
            
            
            return (
                    <li key={friend._id} onClick={() => currentFriendChat(friendChat)}>
                        <p>{friend.username}</p>
                        <button onClick={() => handleClick(friend)}>Delete Friend</button>
                    </li>
            );
            
        }
    });
        

    return (
        <>
            <ul>{friendsList}</ul>
        </>
    );

}

export default FriendsList;