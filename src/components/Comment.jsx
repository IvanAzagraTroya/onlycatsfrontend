import './Comment.css';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import likeAnimationData from '../assets/like-animation.json';
import repeatAnimationData from '../assets/repeat-animation.json';
import { Avatar } from '@mui/material';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import React, {useState, useRef, useEffect} from 'react';
import useFetch from '../utils/UseFetch';

const Comment = ({ id, content, avatar, displayName, username, commentDate, likes, postId, userId }) => {

  const [isLiked, setIsLiked] = useState(false);
  const animationRef = useRef(null);

  const [isClicked, setIsClicked] = useState(false);

  const [textClicked, setIsTextClicked] = useState(false);
  var trimmedComment = "";

  var currentLikes = likes;
  if(content == undefined) content = "";
  trimmedComment = content.length >= 100 ? content.substring(0, 50) + ' ...' : content;

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
      currentLikes = likes+1;
    }else if(isClicked && animationRef.current){
      animationRef.current.stop();
      currentLikes = currentLikes -1;
    }
  }

  const handleExpandText = () => {
    setIsTextClicked(!textClicked);
  }

  const comments = useFetch('http://localhost:8000/onlycats/comments')
  const activity = useFetch('http://localhost:8000/onlycats/interactions')
  const commentsReady = comments.data;
  const activityReady = activity.data;
  
    return (
      <div className='comment'>
        <div className="comment_headerContent">
          <Avatar src={avatar} className="post_avatar"/>
          <div className="post_headerText">
            <h3>
              {displayName}{' '}
              <span className="post_headerSpecial">
                @{username}
              </span>
            </h3>
          </div>
        </div>
        <div className="comment_text"> 
          <div className="comment_content" onClick={handleExpandText}> 
            <div className={`comment_content ${textClicked ? 'expanded' : ''}`}> 
              {textClicked ? content : 
              ( <>
               {trimmedComment}</> 
              )} 
            </div> 
          </div> 
        </div>
        <p>date: {commentDate.split(' ')[0]}</p>
        <div className='comment_buttons'>
            <button className='fav_button' onClick={handleLike}>
            {isLiked ? ( 
                  <DotLottieReact
                    autoplay={true}
                    data={likeAnimationData} 
                    speed={1.5}
                    loop={false} // Ensure animation plays only once
                    style={{ width: '20px', height: '20px', left:'5px', position:'relative', scale: '2' }} // Adjust size as needed
                  />
                 ) : (
                  <FavoriteBorderIcon fontSize="small" />
                 )}

            </button> <p>{currentLikes}</p>
            <button>
              <ChatBubbleOutlineIcon fontSize="small" />
            </button>
            <button onClick={handleClick}>
              { isClicked ? (<DotLottieReact
                  autoplay={true}
                  data ={repeatAnimationData} 
                  loop={false}
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