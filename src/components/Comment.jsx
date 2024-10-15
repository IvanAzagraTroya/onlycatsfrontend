import './Comment.css';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
<<<<<<< Updated upstream
import { VerifiedTwoTone } from '@mui/icons-material';

import likeAnimationData from '../assets/like-animation.json';
import repeatAnimationData from '../assets/repeat-animation.json';
=======

import likeAnimationData from '/public/like-animation.json';
import repeatAnimationData from '/public/repeat-animation.json';
>>>>>>> Stashed changes
import { Avatar } from '@mui/material';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import React, {useState, useRef, useEffect} from 'react';
<<<<<<< Updated upstream

const Comment = ({ commentId, commentText, avatar, displayName, username, verified }) => {
=======
import useFetch from '../utils/UseFetch';

const Comment = ({ commentText, avatar, displayName, username, date, likes }) => {
>>>>>>> Stashed changes

  const [isLiked, setIsLiked] = useState(false);
  const animationRef = useRef(null);

  const [isClicked, setIsClicked] = useState(false);

  const [textClicked, setIsTextClicked] = useState(false);
<<<<<<< Updated upstream
  const trimmedComment = commentText.substring(0, 100);
=======
  var trimmedComment = "";

  var currentLikes = likes;
  if(commentText.length > 100) {
    trimmedComment = commentText.substring(0, 100);
  }else {trimmedComment = commentText}
>>>>>>> Stashed changes

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked && animationRef.current) {
      animationRef.current.play();
    }else if(isLiked && animationRef.current){
      animationRef.current.stop();
    }
  }

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (!isClicked && animationRef.current) {
      animationRef.current.play();
<<<<<<< Updated upstream
    }else if(isClicked && animationRef.current){
      animationRef.current.stop();
=======
      currentLikes = likes+1;
    }else if(isClicked && animationRef.current){
      animationRef.current.stop();
      currentLikes = currentLikes -1;
>>>>>>> Stashed changes
    }
  }

  const handleExpandText = () => {
    setIsTextClicked(!textClicked);
  }
<<<<<<< Updated upstream
  
    return (
      <div className='comment' id={"comment-"+commentId}>
=======

  const comments = useFetch('http://localhost:8000/comments')
  const activity = useFetch('http://localhost:8000/activity')
  const commentsReady = comments.data;
  const activityReady = activity.data;
  
    return (
      <div className='comment'>
>>>>>>> Stashed changes
        <div className="comment_headerContent">
          <Avatar src={avatar} className="post_avatar"/>
          <div className="post_headerText">
            <h3>
              {displayName}{' '}
              <span className="post_headerSpecial">
<<<<<<< Updated upstream
                {verified && <VerifiedTwoTone className="post_badge" />} @{username}
=======
                @{username}
>>>>>>> Stashed changes
              </span>
            </h3>
          </div>
        </div>
        <div className="comment_text">
          <div className="comment_content">
            <div className={`comment_content ${textClicked ? 'expanded' : ''}`} onClick={handleExpandText}>
            {textClicked ?  (
              (commentText)
            ) : 
            (
              <>
                {trimmedComment} <b> more... </b>
              </>
            )}
            </div>
          </div>
        </div>
<<<<<<< Updated upstream
        <div className='comment_buttons'>
            <button className='fav_button' onClick={handleLike}>
            {isLiked ? ( // Conditionally render the animation or icon
=======
        <p>date: {date}</p>
        <div className='comment_buttons'>
            <button className='fav_button' onClick={handleLike}>
            {isLiked ? ( 
>>>>>>> Stashed changes
                  <DotLottieReact
                    autoplay={true}
                    data={likeAnimationData} 
                    speed={1.5}
                    loop={false} // Ensure animation plays only once
                    style={{ width: '20px', height: '20px', left:'5pxº', position:'relative', scale: '2' }} // Adjust size as needed
                  />
<<<<<<< Updated upstream
                   
=======
>>>>>>> Stashed changes
                 ) : (
                  <FavoriteBorderIcon fontSize="small" />
                 )}

<<<<<<< Updated upstream
            </button> 
=======
            </button> <p>{currentLikes}</p>
>>>>>>> Stashed changes
            <button>
              <ChatBubbleOutlineIcon fontSize="small" />
            </button>
            <button onClick={handleClick}>
              { isClicked ? (<DotLottieReact
                  autoplay={true}
                  data ={repeatAnimationData} 
<<<<<<< Updated upstream
                  loop={false} // Ensure animation plays only once
=======
                  loop={false}
>>>>>>> Stashed changes
                  speed={2.5}
                  style={{ width: '20px', height: '20px', down:'2px', position:'relative', scale: '2' }}
              /> 
            ) : (
                <RepeatIcon fontSize="small" />
              )
            }
            </button>
            {/* <PublishIcon fontSize="small" /> */}
          </div>
      </div>
    );
  };
  export default Comment;