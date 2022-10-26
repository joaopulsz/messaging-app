import UserContext from "../UserContext";
import { useEffect, useContext, useState} from "react";

const Chat = ({currentChat, updateChat, socket}) => {

    const {users, loggedInUser} = useContext(UserContext);

    const [messageInput, setMessageInput] = useState("");

    const handleMessageChange = (event) => {
        setMessageInput(event.target.value);
    }

    const sendMessage = async (event) => {
        event.preventDefault();
        const params = {
            message: messageInput,
            user_id: loggedInUser._id, 
            chat_id: currentChat._id,
            created: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()  
        }
        await socket.emit("send_message", params);
        updateChat(params);
        setMessageInput("");
    }

    const findUsername = () => {
        const chatUser = currentChat.users[0]._id === loggedInUser._id ? currentChat.users[1].username : currentChat.users[0].username;
        return chatUser
    }

    useEffect(() => {  
        console.log("useEffect from Chat");   
        socket.on("receive_message", (message) => {
            console.log("receive_message", message);
            updateChat(message);
    })
    }, [socket]);

    return (
        <div id="chat-box">

            {/* Will currently only work for 2 people*/}
            <h2>{findUsername()}</h2> 
        
            <div id="message-box">
              {currentChat.messages.map((message, index) => {
                return( 
                <div key={index}>
                    <p className={loggedInUser === message.user ? "you" : "other"}>{message.message}</p>
                    {/* <p className="message-username">{message.user.username}</p> */}
                    <p className="message-date">{message.created}</p>
                </div>
              )})}   
            </div>

            <form id="message-input">
                <input
                    type="text"
                    placeholder="Type message..."
                    onChange={handleMessageChange}
                    value={messageInput}
                />
                <button onClick={sendMessage} type="submit">&#xF6C0;</button>
            </form>
                  
        </div>
    );

}

export default Chat;