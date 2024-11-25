import React, {useState, useRef, useParams, useCallback, useEffect} from 'react';
import './Post.css';
import { Avatar } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { VerifiedTwoTone } from '@mui/icons-material';
import likeAnimationData from '../assets/like-animation.json';
import repeatAnimationData from '../assets/repeat-animation.json';
import loadCatPaw from '../assets/cat-paw-load2.json';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Comment from '../components/Comment.jsx';
import useFetch from '../utils/UseFetch';
import axios from 'axios';
import getCookie from '../utils/GetCoockie';
import decodeJwt from '../utils/DecodeJwt';

function Post({ id, owner_id, displayName, username, verified, text, image, avatar, likes, date }) {

  const jwt = getCookie('jwt');
  const userToken = jwt ? decodeJwt(jwt) : null;

  const [isLiked, setIsLiked] = useState(false);
  const [likess, setLikes] = useState(0);
  const animationRef = useRef(null);

  const [isClicked, setIsClicked] = useState(false);
  const [postImage, setPostImage] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        //console.log(image);
        if(image != ""){
          //var uri = encodeURI(image);
          const response = await axios.get('http://localhost:8000/onlycats/posts/image?ImageUrl=' + image, {
            responseType: 'blob'
          });
          //console.log("Image blob data: ", response.data);
          const imageBlob = URL.createObjectURL(response.data);
          setPostImage(imageBlob);
        }
      } catch(error) {
        console.error('Error fetching post image: ', error)
      }
    };
    fetchImage();
  }, [image]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked && animationRef.current) {
      animationRef.current.play();
    }else if(isLiked && animationRef.current){
      animationRef.current.stop();
    }
    const response = axios.put('http://localhost:8000/onlycats/posts/update_likes/'+id, isLiked, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    });
    console.log(response.data)
    setLikes(response.data.likeNumber);
  }

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (!isClicked && animationRef.current) {
      animationRef.current.play();
    }else if(isClicked && animationRef.current){
      animationRef.current.stop();
    }
  }

  const comments = useFetch('http://localhost:8000/onlycats/comments/post/'+id)
  const commentsReady = comments.data;

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
              <img width="100%" src={postImage} alt="image" className='post_image'/>
        </div>
        <div className="post_footer">
          <div className='footer_buttons'>
            <button className='fav_button' onClick={handleLike}>
            {isLiked ? (
                  <DotLottieReact
                    autoplay={true}
                    data={likeAnimationData} 
                    speed={1.5}
                    loop={false}
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
        { !comments.isPending ? (
          commentsReady != null? (
            commentsReady.filter(comment => comment.postId == id)
             .map((comment) => ( 
               <Comment 
               key={comment.id}
               commentId={comment.id}
               postId={comment.postId} 
               userId={comment.userId}
               content={comment.content} 
               displayName={comment.displayname} 
               username={comment.username} 
               commentDate = {comment.commentDate}
               likes = {comment.likes}
              />
            ))
          ) : (
            <i style={{color: 'gray'}}>There are no comments yet</i>
          )
          ) : (
          <>
            {(comments.isPending) ? (
              <DotLottieReact
                autoplay={true}
                data={loadCatPaw}
                speed={1}
                loop={true}
                />
            ):(null)
            }
          </>
          )
          }

          
          {/* <Comment commentId={2} commentText={text} displayName={displayName} username={username} avatar={avatar} />
          <Comment commentId={3} commentText={text} displayName={displayName} username={username} avatar={avatar} />
          <Comment commentId={4} commentText={text} displayName={displayName} username={username} avatar={avatar} />
          <Comment commentId={5} commentText={text} displayName={displayName} username={username} avatar={avatar} /> */}
        </div>
        
      </div>
    </div>
  );
}

export default Post;

