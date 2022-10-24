import { useContext} from "react";
import UserContext from "../UserContext";
import Registration from "../components/Registration";
import Login from "../components/Login"
import User from "../components/User"

const UserContainer = ({addUser}) => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);

    const fetchLogIn = async user => {
        try {
            const response = await fetch("http://localhost:4000/login",{
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            const savedUser = await response.json();
            setLoggedInUser(savedUser);
        } catch (err) {
            console.log(err)
            setLoggedInUser()
        }
    }
    
    return (
        <>
            <Registration addUser={addUser}/>
            <Login fetchLogIn={fetchLogIn} />
            <User />
        </>
    )
}

export default UserContainer;