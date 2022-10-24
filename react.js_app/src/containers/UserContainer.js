import { useContext} from "react";
import UserContext from "../UserContext";
import Registration from "../components/Registration";

const UserContainer = ({addUser}) => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);

    return (
        <>
            <Registration addUser={addUser}/>
        </>
    )
}

export default UserContainer;