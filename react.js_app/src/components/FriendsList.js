import { useContext } from "react";
import UserContext from "../UserContext";

const FriendsList = ({friends, filteredChats, currentFriendChat}) => {

    const {users} = useContext(UserContext);
    
    const filteredFriends = users.map(user => {
        return friends.map(friend => {
            if (friend === user._id) {
                return user;
            }
        })
    })

    const friendsList = filteredFriends.flat().map(friend => {
        const friendChat = filteredChats.map(chat => {
            if(chat.users[0] || chat.users[1] === friend) {
                return chat;
            }
        })
        if (friend) {
            return (
            <li onClick={() => currentFriendChat(friendChat)}>
                <p>{friend.username}</p>
                <button>Delete Friend</button>
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