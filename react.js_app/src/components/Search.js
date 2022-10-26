import { useContext, useState } from "react";
import UserContext from "../UserContext";
import { Autocomplete } from '@mui/material'
import { TextField } from "@mui/material";

const Search = ({filteredFun, addFriend}) => {
    const {loggedInUser, users} = useContext(UserContext);
    const [searchedUser, setSearchedUser] = useState([])
    const [isFriend, setIsFriend] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const optionsObjectArr = users.filter(user => user.username.toLowerCase() !== loggedInUser.username.toLowerCase())

    const options = optionsObjectArr.map(user => user.username)

    const filteredUser = () => users.find(user => {
            if(user.username.toLowerCase() === (inputValue.toLowerCase())){
                setSearchedUser(user)
                return user
            }else{
                return null
            }
        })

    const filteredFriends = username => {
        return loggedInUser.friends.find(friendId => {
            const friend = users.find(user => user._id === friendId)
            if(friend.username.toLowerCase() === username.toLowerCase()){
                console.log(friend);
                setSearchedUser(friend)
                return friend
            }else{
                return null
            }
        })
    }

    const isFindFriend = () => {
        return loggedInUser.friends.find(friendId => {
            const isFind = users.find(user => {
                if(user._id === friendId){
                    return user.username.toLowerCase() === inputValue.toLowerCase()
                }else{
                    return false
                }
            })
            setIsFriend(isFind)
            return isFind
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        if(inputValue === "") filteredFun(loggedInUser.friends)
        const friend = filteredFriends(inputValue)
        if(isFindFriend() && friend){
            filteredFun([friend])
        }
        setInputValue("")
    }

    const handleClickToAddFriend = () => {
        if(isFindFriend() === undefined){
            const user = filteredUser()
            addFriend(user)
            setInputValue("")
        }
    }

return(
    <div className="search">
        <Autocomplete
            freeSolo
            disableClearable
            options={options}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search username"
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    }}
                />
              )}
        />
        <div className="right">
            <button onClick={handleSubmit}>Search</button>
            <button onClick={handleClickToAddFriend}>Add Friend</button>
        </div>
    </div>
)

}

export default Search;