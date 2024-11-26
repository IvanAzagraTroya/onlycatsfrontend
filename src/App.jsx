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
  const [isFeedSelected, setIsFeedSelected] = useState(false);
  const [isProfileSelected, setIsProfileSelected] = useState(true);
  const [isNotificationsSelected, setIsNotificationsSelected] = useState(false);
  const [isPublishSelected, setIsPublishSelected] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [jwt, setJwt] = useState();
  const [userToken, setUserToken] = useState();
  const [user, setUser] = useState();
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const cookieJwt = getCookie('jwt');
    if (cookieJwt) {
      setJwt(cookieJwt);
    }
  }, []);

  useEffect(() => {
    if (jwt || user == undefined) {
      handleLogin();
    }
  }, [jwt]);

  const handleLogin = async () => {
    console.log("inside handle login");
    if (jwt) {
      console.log(jwt);
      const token = decodeJwt(jwt);
      console.log(token);
      setUserToken(token);

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
            console.log(logUser.data);
          }
        } catch (error) {
          console.error('Error logging in:', error);
        }
      }
    }
  }

  function handleFeedClick() {
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

  const fetchInteractionsData = async () => {
    try {
      const postsInteractions = await axios.get(`http://localhost:8000/onlycats/posts/ids?id=${user.userId}`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
  
      console.log(postsInteractions);
  
      const interactionPromises = postsInteractions.data.map(id => 
        axios.get(`http://localhost:8000/onlycats/interactions/${id}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        })
      );
  
      const interactionResponses = await Promise.all(interactionPromises);
      const interactionsArray = interactionResponses.map(response => response.data);
  
      setInteractions(interactionsArray);
      console.log(interactionsArray)
      console.log(interactions)
    } catch (error) {
      console.error('Error fetching interactions:', error);
    }
  };

  const users = useFetch('http://localhost:8000/onlycats/users')
  const posts = useFetch('http://localhost:8000/onlycats/posts')
  const activity = useFetch('http://localhost:8000/onlycats/interactions')

  const usersReady = users.data;
  const postsReady = posts.data;
  const activityReady = activity.data;

  return (
    <div>
      {location.reload}
      {/* <h1 className="web-header">Onlycats <img src='src/assets/nyan-cat.gif'/></h1> */}
      <div className="container">
        {/* <div>
          <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
          <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
        </div> */}

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
          {isFeedSelected && !posts.isPending && !users.isPending ? (

            <div className='content-container'>
              {postsReady.map((post) => {
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
                }})}
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
              {isProfileSelected && !users.isPending ? (
                <div className='content-container'>
                  <User />
                </div>
              ): (
                <>
                {users.isPending && isLogged ? (null):(null)}
                </>
              )}
              {isNotificationsSelected ? (
                <div className='content-container'>
                  {console.log(fetchInteractionsData())}
                { interactions != undefined ? (
                    <Notification key={activity.id} avatar={usersReady[2].profile_picture} display_name={usersReady[2].display_name} post_id={activity.post_id}
                    user_id={usersReady[2].id} text={activity.text} reaction_type={activity.reaction_type} activity_date={activity.activity_date}/>
                ): ( (isLogged && interactions == undefined) ? (
                  null
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