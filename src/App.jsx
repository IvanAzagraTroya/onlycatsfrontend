import './App.css'
import Post from './components/Post'
import { AccountCircleRounded, Home, NotificationsRounded } from '@mui/icons-material'

function App() {

  return (
    <div className="container">

      <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" class="gif" />
      <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" class="gif" />
      <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" class="gif" />
      <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" class="gif" />
      <img src="src/assets/nyan-cat.gif" alt="nyan-cat-gif" class="gif" />

      <div className="menu-column">
        <button className="menu-button">
          <AccountCircleRounded fontSize="large" className='account-button'/>
        </button>
        <button className="menu-button">
          <Home fontSize="large" className='rss-button'/>
        </button>
        <button className="menu-button">
          <NotificationsRounded fontSize="large" className='notification-button'/>
        </button>
      </div>
      <div className="feed-column">
        this is the feed mothertrucker
        <Post displayName={"Test1"} username={"test_user"} verified={true} 
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        image={'src/assets/react.svg'} avatar={'src/assets/hollow-heart.svg'}/>

        Post 2
        <Post displayName={"Test1"} username={"test_user"} verified={true} 
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        image={'src/assets/react.svg'} avatar={'src/assets/hollow-heart.svg'}/>
        Pos3
        <Post displayName={"Test1"} username={"test_user"} verified={true} 
        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        image={'src/assets/react.svg'} avatar={'src/assets/hollow-heart.svg'}/>
      </div>
      <div className='sugerence-column'></div>
    </div>
  )
}

export default App
