import './User.css';
import { Avatar } from '@mui/material';
import Post from '../components/Post'
import useFetch from '../utils/UseFetch';

function User(id, display_name, username, profile_picture, follower_number, following_number, number_posts) {
    const users = useFetch('http://localhost:8000/users')
    const posts = useFetch('http://localhost:8000/posts')
    var usersReady;
    var user;
    if(!users.isPending){
        const usersReady = users.data;
        user = usersReady[0];
    }
    
    var postsReady;
    if(!posts.isPending){
        postsReady = posts.data;
    }
    return(
        <div className="user-page">
          {!users.isPending ? (
            <div>
            <div className='user-header'>
                <div className="user-profile">
                    <Avatar/>
                    <h1>{user.display_name}</h1> 
                    @{user.username}
                </div>
                <div className="user-stats">
                    {/* User Stats like Followers, Following, Tweets */}
                    <div>
                        <h3>Posts</h3> {user.number_posts}
                    
                        <h3>Following</h3> {user.following_number}

                        <h3>Followers</h3> {user.follower_number}
                    </div>
                </div>
            </div>
            <div className="user-tweets">
            {!posts.isPending ? postsReady.map((post) => {
                // Find the corresponding user in usersReady based on a common ID
                
                console.log(user);
                // If a matching user is found, create the Post component
                if (post.owner_id == user.id) {
                  return (
                    <Post
                      key={post.id}
                      id={post.id} // Add a unique key for each Post component
                      owner_id = {user.id}
                      displayName={user.display_name} 
                      username={user.username} 
                      verified={user.verified} 
                      text={"aaaaaaaaaaaaaaaaaaaasigueñaaaaaaaaaaaa"}
                      image={post.image_url} 
                      avatar={user.profile_picture} 
                      likes={post.likes}
                      date={post.post_date}
                    />
                  );
                } else {
                  <h1>No posts</h1>
                  return null; 
                }}) : (<h1>No posts available</h1>)}
                {/* List of User's Tweets */}
                {/* You can implement this using a map function to render each tweet */}
                {/* Example: tweets.map((tweet) => <Tweet tweet={tweet} />) */}
                {/* <Post displayName={"Test1"} username={"test_user"} verified={true} 
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                image={'src/assets/react.svg'} avatar={'src/assets/hollow-heart.svg'}/>

                Post 2
                <Post displayName={"Test1"} username={"test_user"} verified={true} 
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                image={'src/assets/react.svg'} avatar={'src/assets/hollow-heart.svg'}/>
                Pos3
                <Post displayName={"Test1"} username={"test_user"} verified={true} 
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                image={'src/assets/react.svg'} avatar={'src/assets/hollow-heart.svg'}/> */}
            </div>
            </div>
          ):
          (
            console.log("no pilla el usuario")
          )}

        </div>
    );
}
export default User;