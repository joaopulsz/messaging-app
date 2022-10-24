import { useContext} from "react";
import UserContext from "../UserContext";

const User = () => {
    const {loggedInUser} = useContext(UserContext)

    return (
        <>
        {loggedInUser != undefined ?
            <div className="User">
                <h3>{loggedInUser.username}</h3>
            </div>
            :
            <div>login</div>
        }
        </>
    )
}

export default User