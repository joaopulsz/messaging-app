import UserContext from "../UserContext";
import { useEffect } from "react";

const Chat = ({currentChat, setCurrentChat, socket, loggedInUser}) => {

    const [user] = UserContext

    // const sendMessage = async () => {
    //     await socket.emit("send_message", message)
    // }

    useEffect(() => {
        socket.on("receive_message", (message) => {
            setCurrentChat((currentChat) => [...currentChat, message])
        })
    }, [socket]);

    

    return (
        <div id="chat-box">

            {/* Will currently only work for 2 people*/}
            <h2>{currentChat.users[0].username === loggedInUser.username ? currentChat.users[1].username : currentChat.users[0].username}</h2> 
        
            <div id="message-box">
              {currentChat.map(message => {
                return( 
                <>
                    <p className={loggedInUser === message.user ? "you" : "other"}>{message.message}</p>
                    <p className="message-username">{message.user.username}</p>
                    <p className="message-date">{message.created}</p>
                </>
              )})}   
            </div>

            <form id="message-input">
                <input
                    type="text"
                    placeholder="Type message..."
                />
                {/* <button onClick={sendMessage} type="submit"></button> */}
            </form>
                  
        </div>
    );

}

export default Chat;