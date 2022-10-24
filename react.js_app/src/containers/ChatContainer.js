const ChatContainer = ({users}) => {

    const [messages, setMessages] = useState([]);
    const [friends, setFriends] = useState([]);

    //  filter users to find friends

    return (
        <>
            <Search/>
            <AddFriend/>
            <FriendsList friends={friends}/>
            <Chat messages={messages}/>
        </>
    );

}

export default ChatContainer;
