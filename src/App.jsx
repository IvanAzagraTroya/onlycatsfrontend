import './App.css';
import React, {useState} from 'react';
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

function App() {
  const [isFeedSelected, setIsFeedSelected] = useState(false);
  const [isProfileSelected, setIsProfileSelected] = useState(true);
  const [isNotificationsSelected, setIsNotificationsSelected] = useState(false);
  const [isPublishSelected, setIsPublishSelected] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const jwt = getCookie('jwt');
  const userToken = jwt ? decodeJwt(jwt) : null;

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
                //console.log(post)
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
                {users.isPending && isLogged ? (null
                  // <DotLottieReact
                  // autoplay={true}
                  // data={loadCatPaw}
                  // speed={1}
                  // loop={true}
                  // />
                ):(null)
                }
                </>
              )}
              {isNotificationsSelected && !activity.isPending? (
                <div className='content-container'>

                {!activity.isPending ? (
                  activityReady.filter(activity => usersReady[2].id == activity.user_id)
                  .map((activity) => (
                    <Notification avatar={usersReady[2].profile_picture} display_name={usersReady[2].display_name} post_id={activity.post_id}
                    user_id={usersReady[2].id} text={activity.text} reaction_type={activity.reaction_type} activity_date={activity.activity_date}/>
                  ))
                ): ( (isLogged && activity.isPending) ? (
                  null
                  // <DotLottieReact
                  //   autoplay={true}
                  //   data={loadCatPaw}
                  //   speed={1}
                  //   loop={true}
                  //   />
                ) : (null)
                )}
                  {/* <Notification displayName="name-notification1" text="somebody liked ur noods" type="like" />
                  <Notification displayName="name-notification2" text="somebody shared ur noods" type="shared" />
                  <Notification displayName="name-notification3" text="somebody disliked ur noods" type="dislike" />
                  <Notification displayName="name-notification4" text="somebody liked ur noods" type="like" /> */}
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
              <Login onLoginSuccess={() => setIsLogged(true)}/>
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
