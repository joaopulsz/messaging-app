import { useContext } from "react";
import UserContext from "../UserContext";

const FriendsList = ({friends, filteredChats, currentFriendChat, deleteFriend}) => {

    const {users} = useContext(UserContext);
    
    const filteredFriends = users.map(user => {
        return friends.map(friend => {
            if (friend === user._id) {
                return user;
            }
        })
    })

    const handleClick = friend => {
        deleteFriend(friend)
    }

    const friendsList = filteredFriends.flat().map(friend => {
        // console.log("FRIEND!", friend);
        const friendChat = filteredChats.map(chat => {
            if(chat.users[0] || chat.users[1] === friend._id) {
                return chat;
                
            }
        })
        if (friend) {
            return (
            <li key={friend._id} onClick={() => currentFriendChat(friendChat)}>
                <p>{friend.username}</p>
                <button onClick={() => handleClick(friend)}>Delete Friend</button>
            </li>);
        }
    });
        
    // const friendChat = filteredChats.map(chat => chat.users[0] || chat.users[1] === friend)
        
        

    return (
        <>
            <ul>{friendsList}</ul>
        </>
    );

}

export default FriendsList;