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

    console.log(filteredFriends)

    const friendsList = filteredFriends.flat().map(friend => {
        if (friend) {
            return <li onClick={() => currentFriendChat()}>{friend.username}</li>;
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