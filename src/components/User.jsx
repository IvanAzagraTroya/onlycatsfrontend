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

  useEffect(() => {
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

    fetchPosts();
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
            <h3>Posts</h3> {number_posts}
            <h3>Following</h3> {following_number}
            <h3>Followers</h3> {follower_number}
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
          <h1>No posts available</h1>
        )}
      </div>
    </div>
  );
}

export default User;