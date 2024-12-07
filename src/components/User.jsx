import React, { useState, useEffect } from 'react';
import './User.css';
import { Avatar } from '@mui/material';
import Post from '../components/Post';
import axios from 'axios';
import getCookie from '../utils/GetCoockie';
import decodeJwt from '../utils/DecodeJwt';

function User({ id, display_name, username, profile_picture, follower_number, following_number, number_posts, isVerified }) {
  const jwt = getCookie('jwt');
  const userToken = jwt ? decodeJwt(jwt) : null;
  const [posts, setPosts] = useState([]);
  const [numLikes, setNumLikes] = useState(0);


  async function fetchPosts() {
    try {
      const postRequest = await axios.get('http://localhost:8000/onlycats/posts/user/' + userToken.userId, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${jwt}`
        }
      });
      setPosts(postRequest.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  useEffect(() => {
    let thisLikes = 0;
    if(posts.length==0) fetchPosts(); 
    posts.forEach(post => {
      thisLikes += post.likeNumber;
    });
    setNumLikes(thisLikes);
  }, [userToken, jwt]);

  return (
    <div className="user-page">
      <div className='user-header'>
        <div className="user-profile">
          {profile_picture ? (
            <Avatar src={profile_picture} />
          ) : (
            <Avatar />
          )}
          <h1>{display_name}</h1>
          @{username}
        </div>
        <div className="user-stats">
          <div>
            <h3><i>Posts</i></h3> <b>{posts.length}</b> &nbsp;
            {/* <h3>Following</h3> {following_number} &nbsp;
            <h3>Followers</h3> {follower_number} &nbsp; */}
            <h3><i>Likes Received</i></h3> <b>{numLikes}</b> &nbsp;
           </div>
        </div>
      </div>
      <div className="user-tweets">
        {posts.length > 0 ? posts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            owner_id={id}
            displayName={display_name}
            username={username}
            text={post.text}
            image={post.imageUrl}
            avatar={profile_picture}
            likes={post.likeNumber}
            date={post.postDate}
          />
        )) : (
          <>
            <a></a>
            <h1>No posts available</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default User;