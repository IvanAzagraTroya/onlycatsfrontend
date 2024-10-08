import './User.css';
import { Avatar } from '@mui/material';
import Post from '../components/Post'

function User() {
    return(
        <div className="user-page">
            <div className='user-header'>
                <div className="user-profile">
                    <Avatar />
                    <h1>User name is name</h1> 
                    @username
                </div>
                <div className="user-stats">
                    {/* User Stats like Followers, Following, Tweets */}
                    <div>
                        <h3>Posts</h3> 123
                    
                        <h3>Following</h3> 456

                        <h3>Followers</h3> 789
                    </div>
                </div>
            </div>
            <div className="user-tweets">
                {/* List of User's Tweets */}
                {/* You can implement this using a map function to render each tweet */}
                {/* Example: tweets.map((tweet) => <Tweet tweet={tweet} />) */}
                <Post displayName={"Test1"} username={"test_user"} verified={true} 
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                image={'src/assets/react.svg'} avatar={'src/assets/hollow-heart.svg'}/>

                Post 2
                <Post displayName={"Test1"} username={"test_user"} verified={true} 
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                image={'src/assets/react.svg'} avatar={'src/assets/hollow-heart.svg'}/>
                Pos3
                <Post displayName={"Test1"} username={"test_user"} verified={true} 
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                image={'src/assets/react.svg'} avatar={'src/assets/hollow-heart.svg'}/>
            </div>
        </div>
    );
}
export default User;