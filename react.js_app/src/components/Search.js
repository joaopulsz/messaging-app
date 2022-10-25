import { useContext, useState } from "react";
import UserContext from "../UserContext";
import { Autocomplete } from '@mui/material'
import { TextField } from "@mui/material";

const Search = () => {
    const {loggedInUser, users} = useContext(UserContext);
    const [searchedUser, setSearchedUser] = useState([])
    const [isFriend, setIsFriend] = useState(false)
    const [inputValue, setInputValue] = useState("")
    console.log("search")

    const filteredUser = searchedUser => users.find(user => user.username.toLowerCase().includes(searchedUser.toLowerCase()))

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

    const filteredFriends = username => loggedInUser.friends.filter(friend => friend.username.toLowerCase().includes(username.toLowerCase()))

    const handleSubmit = event => {
        event.preventDefault()
    }

return(
    <div className="search">
        <h2>Search</h2>
        {/* <form onSubmit={handleSubmit}> */}
            {/* search bar */}
            {/* <input
            type="search"
            id="search-input"
            placeholder="Search by username"
            name="search"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            /> */}
            {/* add friend button */}
            {/* <input
            type="submit"
            id="search-btn"
            value={isFriend? "Remove friend" : "Add Friend"}
            />
        </form> */}
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
        {searchedUser ? <h2>{searchedUser.username}</h2> : <h2></h2>}
    </div>
)

}

export default Search;