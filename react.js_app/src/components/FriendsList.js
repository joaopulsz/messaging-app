import "./FriendsList.css"

const FriendsList = ({friends, filteredChats, currentFriendChat, deleteFriend}) => {

    const handleClick = friend => {
        deleteFriend(friend)
    }
    // return chat between the logged in user and the clicked friend 
// for each friend of the logged in user, 
    const friendsList = friends.map(friend => {


            const chat = filteredChats.find(chat => {
                return chat.users.findIndex(user => user._id === friend._id) !== -1
            })
            
            return (
            <li key={friend._id}>
                <p onClick={() => currentFriendChat(chat)}>{friend.username}</p>
                <button onClick={() => handleClick(friend)}>&#128465;</button>
            </li>);
    });
        
    return (
        <div id="friends-list-div">
                <h3>Friends</h3>
            <div className="friends-list-container">
                <ul className="friends-list">{friendsList}</ul>
            </div>
        </div>
    );

}

export default FriendsList;