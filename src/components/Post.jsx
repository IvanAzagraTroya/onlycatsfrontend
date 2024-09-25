import React, {useState, useRef, useCallback} from 'react';
import './Post.css';
import { Avatar } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import { VerifiedTwoTone } from '@mui/icons-material';
import likeAnimationData from '../assets/like-animation.json';
import repeatAnimationData from '../assets/repeat-animation.json';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";



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

  const imgRef = useRef();
  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef;
    // check if image exists
    if (img) {
      const value = make3dTransformValue({ x, y, scale });
      img.style.setProperty("transform", value);
    }
  }, []);


  return (
    <div className="post">
      <div className='post_header'>
        <div className="post_headerContent">
          <Avatar src={avatar} className="post_avatar"/>
          <div className="post_headerText">
            <h3>
              {displayName}{' '}
              <span className="post_headerSpecial">
                {verified && <VerifiedTwoTone className="post__badge" />} @{username}
              </span>
            </h3>
          </div>
        </div>
      </div>
      <br/>
      <div className="post_body">
        <div className='image-container'>
              <img width="100%" src={image} ref={imgRef} alt="image" className='post_image'/>
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
                    style={{ width: '45px', height: '45px', down:'3px', left:'5pxº', position:'relative' }} // Adjust size as needed
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
                  style={{ width: '45px', height: '45px', down:'2px', position:'relative' }}
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
  );
}

export default Post;

