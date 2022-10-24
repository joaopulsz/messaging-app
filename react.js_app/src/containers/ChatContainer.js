const ChatContainer = ({loggedInUser, setLoggedInUser, users, chats}) => {

    const [friends, setFriends] = useState([]);
    setFriends(loggedInUser.friends);

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

    return (
        <>
            <Search/>
            <AddFriend users={users}/>
            <FriendsList friends={friends}/>
            <Chat filteredChats={filteredChats}/>
        </>
    );

}

export default ChatContainer;
