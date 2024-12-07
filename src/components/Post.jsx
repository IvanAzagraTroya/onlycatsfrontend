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
import axios from 'axios';
import getCookie from '../utils/GetCoockie';
import decodeJwt from '../utils/DecodeJwt';

function Post({ id, owner_id, displayName, username, verified, text, image, avatar, likes, date }) {
  const jwt = getCookie('jwt');
  const userToken = jwt ? decodeJwt(jwt) : null;

  const [isLiked, setIsLiked] = useState(false);
  const [likess, setLikes] = useState(likes);
  const animationRef = useRef(null);

  const [isClicked, setIsClicked] = useState(false);
  const [postImage, setPostImage] = useState('');

  const [textAreaContent, setTextAreaContent] = useState('');
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const handleTextAreaChange = (event) => {
    setTextAreaContent(event.target.value);
  };

  useEffect(() => {
    const fetchImage = async () => {
      setLikes(likess);
      try {
        if (image !== "") {
          const response = await axios.get('http://localhost:8000/onlycats/posts/image?ImageUrl=' + image, {
            responseType: 'blob'
          });
          const imageBlob = URL.createObjectURL(response.data);
          setPostImage(imageBlob);
        }
      } catch (error) {
        console.error('Error fetching post image: ', error);
      }
    };
    fetchImage();
  }, [image]);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/onlycats/comments/post/' + id);
      setComments(response.data);
      setLoadingComments(false);
    } catch (error) {
      console.error('Error fetching comments: ', error);
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleLike = () => {
    postLike(!isLiked);
    setIsLiked(!isLiked);

    if (isLiked && animationRef.current) {
      animationRef.current.play();
    } else if (!isLiked && animationRef.current) {
      animationRef.current.stop();
    }
  };
  const postLike = async (isLiked) => {
    try {
      console.log("like antes put: ", isLiked)
      const response = await axios.put('http://localhost:8000/onlycats/posts/update_likes/' + id, {isLiked}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        }
      });

      let activityForm = new FormData();
      activityForm.append('postId', id);
      activityForm.append('userId', userToken.userId);
      activityForm.append('actionType', 2);
      activityForm.append('text', "Someone liked yout post");
      await axios.post('http://localhost:8000/onlycats/interactions/insert', activityForm, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      setLikes(response.data.likeNumber);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  }

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (!isClicked && animationRef.current) {
      animationRef.current.play();
    } else if (isClicked && animationRef.current) {
      animationRef.current.stop();
    }
  };

  const postNewComment = async () => {
    let form = new FormData();
    form.append('postId', id);
    form.append('userId', userToken.userId);
    form.append('content', textAreaContent);
    form.append('displayname', userToken.username);
    form.append('username', userToken.username);
    try {
      const response = await axios.post('http://localhost:8000/onlycats/comments/insert', form, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).finally(() => {
        setLoadingComments(true);
        fetchComments();
      }).then(response => {
        let responseData = response.data;
        setTextAreaContent('');
        setComments([...comments, responseData]);
      });
      let activityForm = new FormData();
      activityForm.append('postId', id);
      activityForm.append('userId', userToken.userId);
      activityForm.append('actionType', 3);
      activityForm.append('text', "Someone commented: "+textAreaContent);
      await axios.post('http://localhost:8000/onlycats/interactions/insert', activityForm, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className='full_component'>
      <div className="post">
        <div className='post_header'>
          <div className="post_headerContent">
            <Avatar src={avatar} className="post_avatar" />
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
        <br />
        <div className="post_body">
          <div className='image-container'>
            <img width="100%" src={postImage} alt="image" className='post_image' />
          </div>
          <div className="post_footer">
            <div className='footer_buttons'>
              <button className='fav_button' onClick={handleLike}>
                {isLiked ? (
                  <>
                    <DotLottieReact
                    autoplay={true}
                    data={likeAnimationData}
                    speed={1.5}
                    loop={false}
                    style={{ width: '20px', height: '20px', down: '2px', scale: '2' }}
                  />
                  {likess}
                  </>
                ) : (
                  <>
                    <FavoriteBorderIcon fontSize="small" /> 
                    {likess}
                  </>
                )}
              </button>
                <ChatBubbleOutlineIcon fontSize="small" /> {comments.length}
              <button onClick={handleClick}>
                {isClicked ? (
                  <DotLottieReact
                    autoplay={true}
                    data={repeatAnimationData}
                    loop={false}
                    speed={2.5}
                    style={{ width: '20px', height: '20px', top: '2px', scale: '2' }}
                  />
                ) : (
                  <RepeatIcon fontSize="small" />
                )}
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
          {!loadingComments ? (
            comments.length > 0 ? (
              comments.filter(comment => comment.postId === id)
                .map((comment) => (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    postId={comment.postId}
                    userId={comment.userId}
                    content={comment.content}
                    displayName={comment.displayname}
                    username={comment.username}
                    commentDate={comment.commentDate}
                    likes={comment.likes}
                  />
                ))
            ) : (
              <i style={{ color: 'gray' }}>There are no comments yet</i>
            )
          ) : (
            <DotLottieReact
              autoplay={true}
              data={loadCatPaw}
              speed={1}
              loop={true}
            />
          )}
          <div className='comment_textarea'>
            <textarea value={textAreaContent} onChange={handleTextAreaChange} />
            <button accessKey='c' onClick={postNewComment}>New comment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;