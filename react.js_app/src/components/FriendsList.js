const FriendsList = (friends, filteredChats, currentFriendChat) => {

    const friendsList = friends.map(friend => {
        const friendChat = filteredChats.map(chat => chat.users[0] || chat.users[1] === friend.id)
        return <li onClick={() => currentFriendChat(friendChat)}>{friend.username}</li>
    })

    return (
        <>
            <ul>{friendsList}</ul>
        </>
    );

}

export default FriendsList;