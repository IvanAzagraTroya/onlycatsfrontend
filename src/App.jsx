import './App.css';
import React, {useState} from 'react';
import Post from './components/Post';
import { AccountCircleRounded, Home, NotificationsRounded } from '@mui/icons-material';
import User from './components/User';

function App() {
  const [isFeedSelected, setIsFeedSelected] = useState(true);
  const [isProfileSelected, setIsProfileSelected] = useState(false);
  const [isNotificationsSelected, setIsNotificationsSelected] = useState(false);

  function handleFeedClick() {
    setIsFeedSelected(true);
    setIsProfileSelected(false);
    setIsNotificationsSelected(false);
  }
  function handleUserClick() {
    setIsFeedSelected(false);
    setIsProfileSelected(true);
    setIsNotificationsSelected(false);
  }
  function handleNotificationsClick() {
    setIsFeedSelected(false);
    setIsProfileSelected(false);
    setIsNotificationsSelected(true);
  }

  return (
    <div className="container">
      <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" class="gif" />
      <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" class="gif" />
      <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" class="gif" />
      <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" class="gif" />
      <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" class="gif" />
      <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" class="gif" />
      <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" class="gif" />
      <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" class="gif" />

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
      </div>
      <div className="content-column">
        {isFeedSelected ?(
          <div>
            {console.log("Feed: ", isFeedSelected)}
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
        {isProfileSelected ? (
          <User />
        ): (
          null
        )}
        {isNotificationsSelected ? (
          null
        ): (
          null
        )}
      </div>
      <div className='sugerence-column'></div>
    </div> 
  )
}

export default App
