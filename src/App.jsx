import './App.css';
import React, {useState, useEffect} from 'react';
import Post from './components/Post';
import { AccountCircleRounded, Home, NotificationsRounded } from '@mui/icons-material';
import PublishIcon from '@mui/icons-material/Publish';
import User from './components/User';
import Notification from './components/Notifications';
import Upload from './components/Upload';
import useFetch from './utils/UseFetch';
import Login from './components/Login';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import loadCatPaw from './assets/cat-paw-load2.json';
import getCookie from './utils/GetCoockie';
import decodeJwt from './utils/DecodeJwt';
import axios from 'axios';

function App() {
  const [isFeedSelected, setIsFeedSelected] = useState(true);
  const [isProfileSelected, setIsProfileSelected] = useState(false);
  const [isNotificationsSelected, setIsNotificationsSelected] = useState(false);
  const [isPublishSelected, setIsPublishSelected] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [jwt, setJwt] = useState();
  const [user, setUser] = useState();
  const [interactions, setInteractions] = useState([]);
  const [userInteractions, setUserInteractions] = useState([])

  useEffect(() => {
    const cookieJwt = getCookie('jwt');
    if (cookieJwt) {
      setJwt(cookieJwt);
    }
  }, []);
  const fetchUserInteractions = async () => {
    if(jwt != undefined){
      const token = decodeJwt(jwt);
      let response = await axios.get('http://localhost:8000/onlycats/interactions/user/'+token.userId, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })
        console.log(response);
        setUserInteractions(response.data)
    }
  }

  useEffect(() => {
    if (jwt || user == undefined) {
      handleLogin();
    }
  }, [jwt]);

  const handleLogin = async () => {
    if (jwt) {
      const token = decodeJwt(jwt);

      if (token) {
        try {
          const logUser = await axios.get(`http://localhost:8000/onlycats/user/${token.userId}`, {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          });
          if (logUser) {
            setUser(logUser.data);
            setIsLogged(true);
          }
        } catch (error) {
          console.error('Error logging in:', error);
        }
        fetchInteractionsData(token.userId)
        fetchUserInteractions();
      }
    }
  }

  function handleFeedClick() {
    location.reload();
    setIsFeedSelected(true);
    setIsProfileSelected(false);
    setIsNotificationsSelected(false);
    setIsPublishSelected(false);
  }
  function handleUserClick() {
    jwt ? setIsLogged(true) : null
    setIsFeedSelected(false);
    setIsProfileSelected(true);
    setIsNotificationsSelected(false);
    setIsPublishSelected(false);
  }
  function handleNotificationsClick() {
    jwt ? setIsLogged(true) : null
    if(isLogged) {
      fetchInteractionsData(user.userId)
    }
    setIsFeedSelected(false);
    setIsProfileSelected(false);
    setIsNotificationsSelected(true);
    setIsPublishSelected(false);
  }
  function handlePublishClick() {
    jwt ? setIsLogged(true) : null
    setIsFeedSelected(false);
    setIsProfileSelected(false);
    setIsNotificationsSelected(false);
    setIsPublishSelected(true);
  }

  const fetchInteractionsData = async (userId) => {
    try {
      const postsInteractions = await axios.get(`http://localhost:8000/onlycats/posts/ids?id=${userId}`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });

      const interactionPromises = postsInteractions.data.map(id => 
        axios.get(`http://localhost:8000/onlycats/interactions/post/id?postId=`+id, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        })
      );
      let newInteractions;
      const interactionResponses = await Promise.all(interactionPromises);
      newInteractions = interactionResponses.map(response => response.data)
      //setInteractions(...interactions, newInteractions);
    } catch (error) {
      console.error('Error fetching interactions:', error);
    }
  };

  const users = useFetch('http://localhost:8000/onlycats/users')
  const posts = useFetch('http://localhost:8000/onlycats/posts')
  const activity = useFetch('http://localhost:8000/onlycats/interactions')

  const usersReady = users.data;
  const postsReady = posts.data;

  return (
    <div>
      <h1 className="web-header">Onlycats <img src='/nyan-cat.gif'/></h1>
      <div className="container">
        <div className='background'>
          <img src="/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
        </div>

        <div className="menu-column">
          <button className="menu-button" onClick={handleUserClick}>
            <AccountCircleRounded fontSize="large" className='account-button'/>
          </button>
          <button className="menu-button" onClick={handleFeedClick}>
            <Home fontSize="large" className='rss-button'/>
          </button>
          <button className="menu-button" onClick={handleNotificationsClick}>
            <NotificationsRounded fontSize="large" className='notification-button'/>
          </button>
          <button className='menu-button' onClick={handlePublishClick}>
            <PublishIcon fontSize="large" className='publish-button'/>
          </button>
        </div>
        <div className="content-column">
          {isFeedSelected && !posts.isPending && !users.isPending && posts != null ? (

            <div className='content-container'>
              {posts != null && postsReady != null ? (
                postsReady.map((post) => {
                  const user = usersReady.find((user) =>
                    user.id == post.owner_id,
                  );
                  if (user) {
                    return (
                      <Post
                        key={post.id}
                        id={post.id}
                        displayName={user.displayName}
                        username={user.username}
                        verified={user.verified}
                        text={post.text}
                        image={post.imageUrl}
                        likes={post.likeNumber}
                        avatar={user.profile_picture}
                      />
                    );
                  } else {
                    <User displayName={"User not found"} username={""} profile_picture={""} follower_number={0} following_number={0} number_posts={0}/>
                    return null;
                  }})
              ):(null)
              }
            </div>
          ) : (
            <>
            {(isFeedSelected && posts.isPending|| isProfileSelected && isLogged && users.isPending|| isNotificationsSelected && isLogged && activity.isPending) ? (
                <DotLottieReact
                autoplay={true}
                data={loadCatPaw}
                speed={1}
                loop={true}
                />
            ):(null)}
            </>
          )}
          {isLogged ? (
            <div>
              {isProfileSelected && !users.isPending  && user != undefined? (
                <div className='content-container'>
                  <User display_name={user.displayName} username={user.userName} profile_picture={user.profilePicture} follower_number={user.followerMum} isVerified={user.isVerified} number_posts={user.postNum} following_number={user.followingNum}/>
                </div>
              ): (
                <>
                {users.isPending && isLogged ? (null):(null)}
                </>
              )}
              {isNotificationsSelected ? (
                <div className='content-container'>
                { isLogged && interactions ? (
                  userInteractions.map((i) => (
                    <Notification key={i.id} id={i.id} avatar={user.profilePicture} display_name={user.displayName} post_id={i.postId}
                     user_id={i.userId} text={i.text} reaction_type={i.activityType} activity_date={i.activityDate}/>
                  ))
                ): ( (isLogged && interactions == undefined) ? (
                  <div className='notification-message'>
                    <h1>THERE ARE NO NOTIFICATIONS</h1>
                  </div>
                ) : (null)
                )}
                </div>
              ): (
                null
              )}
              {isPublishSelected ? (
                <Upload />
              ): (
                null
              )}
            </div>
          ):(
            <>
            {!isFeedSelected ? (
              <Login onLoginSuccess={ handleLogin }/>
            ): (null)
          }
          </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App