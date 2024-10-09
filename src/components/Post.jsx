import React, {useState, useRef, useCallback} from 'react';
import './Post.css';
import { Avatar } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { VerifiedTwoTone } from '@mui/icons-material';
import likeAnimationData from '../assets/like-animation.json';
import repeatAnimationData from '../assets/repeat-animation.json';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Comment from '../components/Comment.jsx';



function Post({ displayName, username, verified, text, image, avatar }) {

  const [isLiked, setIsLiked] = useState(false);
  const animationRef = useRef(null);

  const [isClicked, setIsClicked] = useState(false);

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

  return (
    <div className='full_component'>
      <div className="post">
      <div className='post_header'>
        <div className="post_headerContent">
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
      </div>
      <br/>
      <div className="post_body">
        <div className='image-container'>
              <img width="100%" src={image} alt="image" className='post_image'/>
        </div>
        <div className="post_footer">
          <div className='footer_buttons'>
            <button className='fav_button' onClick={handleLike}>
            {isLiked ? ( // Conditionally render the animation or icon
                  <DotLottieReact
                    autoplay={true}
                    data={likeAnimationData} 
                    speed={1.5}
                    loop={false} // Ensure animation plays only once
                    style={{ width: '20px', height: '20px', down:'2px', scale:'2' }}
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
                  style={{ width: '20px', height: '20px', top:'2px', scale: '2' }}
              /> 
            ) : (
                <RepeatIcon fontSize="small" />
              )
            }
            </button>
            {/* <PublishIcon fontSize="small" /> */}
          </div>
          <div className="post_description">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
      <div className='comments_container'>
        <div className='comment_title'>
          <b>Comments:</b>
        </div>
        <div className='comment_reponse'>
          {/* {comments.map((comment, index) => ( */}
          {/* ))} */}
          <Comment commentId={1} commentText={text} displayName={displayName} username={username} avatar={avatar} verified={verified}/>
          <Comment commentId={2} commentText={text} displayName={displayName} username={username} avatar={avatar} verified={verified}/>
          <Comment commentId={3} commentText={text} displayName={displayName} username={username} avatar={avatar} verified={verified}/>
          <Comment commentId={4} commentText={text} displayName={displayName} username={username} avatar={avatar} verified={verified}/>
          <Comment commentId={5} commentText={text} displayName={displayName} username={username} avatar={avatar} verified={verified}/>
        </div>
        
      </div>
    </div>
  );
}

export default Post;

