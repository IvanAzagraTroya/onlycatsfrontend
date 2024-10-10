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

function App() {
  const [isFeedSelected, setIsFeedSelected] = useState(true);
  const [isProfileSelected, setIsProfileSelected] = useState(false);
  const [isNotificationsSelected, setIsNotificationsSelected] = useState(false);
  const [isPublishSelected, setIsPublishSelected] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  function handleFeedClick() {
    setIsFeedSelected(true);
    setIsProfileSelected(false);
    setIsNotificationsSelected(false);
    setIsPublishSelected(false);
  }
  function handleUserClick() {
    setIsFeedSelected(false);
    setIsProfileSelected(true);
    setIsNotificationsSelected(false);
    setIsPublishSelected(false);
  }
  function handleNotificationsClick() {
    setIsFeedSelected(false);
    setIsProfileSelected(false);
    setIsNotificationsSelected(true);
    setIsPublishSelected(false);
  }
  function handlePublishClick() {
    setIsFeedSelected(false);
    setIsProfileSelected(false);
    setIsNotificationsSelected(false);
    setIsPublishSelected(true);
  }

  function handleLoging() {
    if(isLogged == false){
      console.log("It's not logged")
    }
  }

  const users = useFetch('http://localhost:8000/users')
  const posts = useFetch('http://localhost:8000/posts')
  const comments = useFetch('http://localhost:8000/comments')
  const activity = useFetch('http://localhost:8000/activity')

  console.log(users.data)
  console.log(posts.data)
  console.log(comments.data)
  console.log(activity.data)
// Puedo hacer una comprobación en el isPending de los useFetch para que desplegue la animación de carga de la pata de gato hasta tener los datos listos.
  return (
    <div>
      <h1 className="web-header">Onlycats <img src='src/assets/nyan-cat.gif'/></h1>
      <div className="container">
        <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
        <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
        <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
        <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
        <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
        <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
        <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />
        <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" className="gif" />

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
          {isFeedSelected ?(
            <div className='content-container'>
              <Post displayName={"Test1"} username={"test_user1"} verified={true} 
              text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
              image={'src/assets/react.svg'} avatar={'src/assets/hollow-heart.svg'}/>
    
              <Post displayName={"Test2"} username={"test_user2"} verified={false} 
              text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
              image={'src/assets/react.svg'} avatar={'src/assets/hollow-heart.svg'}/>
    
              <Post displayName={"Test3"} username={"test_user3"} verified={true} 
              text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
              image={'src/assets/react.svg'} avatar={'src/assets/hollow-heart.svg'}/>
            </div>
          ) : (
            null
          )}
          {isLogged ? (
            <div>
              {isProfileSelected ? (
                <div className='content-container'>
                  <User />
                </div>
              ): (
                null
              )}
              {isNotificationsSelected ? (
                <div className='content-container'>
                  <Notification displayName="name-notification1" text="somebody liked ur noods" type="like" />
                  <Notification displayName="name-notification2" text="somebody shared ur noods" type="shared" />
                  <Notification displayName="name-notification3" text="somebody disliked ur noods" type="dislike" />
                  <Notification displayName="name-notification4" text="somebody liked ur noods" type="like" />
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
            <Login onLoginSuccess={() => setIsLogged(true)}/>
          )}
        </div>
        <div className='sugerence-column'></div>
      </div> 
    </div>
  )
}

export default App
