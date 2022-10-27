import UserContext from "../UserContext";
import { useContext, useState} from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css"


const Chat = ({currentChat, updateChat, socket}) => {

    const {loggedInUser} = useContext(UserContext);

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
        setMessageInput("");
    }

    const findUsername = () => {
        const chatUser = currentChat.users[0]._id === loggedInUser._id ? currentChat.users[1].username : currentChat.users[0].username;
        return chatUser
    }

    socket.on("receive_message", (message) => {
        updateChat(message);
    })

    return (
        <div id="chat-box">

            <h2>{findUsername()}</h2> 
        
            <div className="message-box">
            <ScrollToBottom className="scroll-to-bottom">
                <div className="message-container">
              {currentChat.messages.map((message, index) => {
                return( 
                <div className={loggedInUser._id === message.user ? "you" : "other"} key={index}>
                    <p >{message.message}</p>
                    <p className="message-details">{loggedInUser._id === message.user? 'You' : findUsername()} {message.created}</p>
                </div>
              )})}
              </div>
                </ScrollToBottom>
            <form id="message-input">
                <input
                    type="text"
                    placeholder="Type message..."
                    onChange={handleMessageChange}
                    value={messageInput}
                />
                <button onClick={sendMessage} type="submit">&#9658;</button>
            </form>
            </div>

                  
        </div>
    );

}

export default Chat;