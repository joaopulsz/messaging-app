import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom"

const Chat = ({socket, username, room}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                username: username,
                message: currentMessage,
                // getting the current time
                time: new Date(Date.now()).getHours() +
                ":" + 
                new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", messageData);
            setMessageList((messageList) => [...messageList, messageData]);
            setCurrentMessage("");    
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((messageList) => [...messageList, data])
        })
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {messageList.map((messageData, index) => {
                    return (
                        <div className="message" id={username === messageData.username ? "you" : "other"}>
                                <div className="message-content">
                                    <p key={index}>{messageData.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{messageData.time}</p>
                                    <p id="username">{messageData.username}</p>
                                </div>
                        </div>
                    );
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input 
                    type="text" 
                    value={currentMessage}
                    placeholder="Your message.."
                    onChange={(event)=> {
                        setCurrentMessage(event.target.value)
                    }}
                    onKeyPress={(event) => {event.key === "Enter" && sendMessage()}}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;