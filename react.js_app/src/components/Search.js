import { Children, useContext, useState } from "react";
import UserContext from "../UserContext";
import { Autocomplete } from '@mui/material'
import { TextField } from "@mui/material";

const Search = ({filteredFun}) => {
    const {loggedInUser, users} = useContext(UserContext);
    const [searchedUser, setSearchedUser] = useState([])
    const [isFriend, setIsFriend] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const filteredUser = searchedUser => users.find(user => {
            if(user.username.toLowerCase().includes(searchedUser.toLowerCase())){
                setSearchedUser(user)
                return user
            }
        })

    const handleChange = event => {
        const searchedUser = filteredUser(event.target.value)
        setSearchedUser(searchedUser)
        if(event.target.value === "") setSearchedUser()
    }
    const handleKeyDown = event => {
        if(loggedInUser.friends.find(user => user.username.toLowerCase() === searchedUser.username.toLowerCase())){
            setIsFriend(true)
        }
    }

    const filteredFriends = username => {
        return loggedInUser.friends.find(friendId => {
            const friend = users.find(user => user._id === friendId)
            if(friend.username.toLowerCase().includes(username.toLowerCase())){
                setSearchedUser(friend)
                return friend
            }
        })
    }

    const isFindFriend = () => {
        return loggedInUser.friends.find(friendId => {
            const isFind = users.find(user => {
                if(user._id === friendId){
                    return user.username.toLowerCase() === inputValue.toLowerCase()
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
            filteredFun([searchedUser._id])
        }
    }

return(
    <div className="search">
        <Autocomplete
            freeSolo
            disableClearable
            options={users.map(user => user.username)}
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
        <button onClick={handleSubmit}>Search</button>
    </div>
)

}

export default Search;