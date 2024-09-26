import './Comment.css';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { VerifiedTwoTone } from '@mui/icons-material';

import likeAnimationData from '../assets/like-animation.json';
import repeatAnimationData from '../assets/repeat-animation.json';
import { Avatar } from '@mui/material';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import React, {useState, useRef, useEffect} from 'react';

const Comment = ({ commentId, commentText, avatar, displayName, username, verified }) => {

  const [isLiked, setIsLiked] = useState(false);
  const animationRef = useRef(null);

  const [isClicked, setIsClicked] = useState(false);

  const [textClicked, setIsTextClicked] = useState(false);
  const trimmedComment = commentText.substring(0, 100);

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
    }else if(isClicked && animationRef.current){
      animationRef.current.stop();
    }
  }

  const handleExpandText = () => {
    setIsTextClicked(!textClicked);
  }
  
    return (
      <div className='comment' id={"comment-"+commentId}>
        <div className="comment_headerContent">
          <Avatar src={avatar} className="post_avatar"/>
          <div className="post_headerText">
            <h3>
              {displayName}{' '}
              <span className="post_headerSpecial">
                {verified && <VerifiedTwoTone className="post_badge" />} @{username}
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
        <div className='comment_buttons'>
            <button className='fav_button' onClick={handleLike}>
            {isLiked ? ( // Conditionally render the animation or icon
                  <DotLottieReact
                    autoplay={true}
                    data={likeAnimationData} 
                    speed={1.5}
                    loop={false} // Ensure animation plays only once
                    style={{ width: '20px', height: '20px', left:'5pxº', position:'relative', scale: '2' }} // Adjust size as needed
                  />
                   
                 ) : (
                  <FavoriteBorderIcon fontSize="small" />
                 )}

            </button> 
            <button>
              <ChatBubbleOutlineIcon fontSize="small" />
            </button>
            <button onClick={handleClick}>
              { isClicked ? (<DotLottieReact
                  autoplay={true}
                  data ={repeatAnimationData} 
                  loop={false} // Ensure animation plays only once
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