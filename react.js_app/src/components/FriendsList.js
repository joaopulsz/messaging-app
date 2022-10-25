const FriendsList = ({friends, filteredChats, currentFriendChat}) => {

    const friendsList = friends.map(friend => {
        const friendChat = filteredChats.map(
            
            const fetchUserById = async () => {
                const response = await fetch(`http://localhost:4000/user/${id}`);
                const userData = await response.json();
                setUsers(userData);
            }
            
        )
        return <li onClick={() => currentFriendChat(friendChat)}>{friend.username}</li>
    })

    return (
        <>
            <ul>{friendsList}</ul>
        </>
    );

}

export default FriendsList;