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
                    <div>
                        <h3>Posts</h3> {user.number_posts}
                    
                        <h3>Following</h3> {user.following_number}

                        <h3>Followers</h3> {user.follower_number}
                    </div>
                </div>
            </div>
            <div className="user-tweets">
            {!posts.isPending ? postsReady.map((post) => {
                //console.log(user);
                if (post.owner_id == user.id) {
                  return (
                    <Post
                      key={post.id}
                      id={post.id}
                      owner_id = {user.id}
                      displayName={user.display_name} 
                      username={user.username} 
                      verified={user.verified} 
                      text={post.text}
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