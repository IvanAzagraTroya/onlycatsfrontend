import { Avatar } from '@mui/material';
import '../components/Notifications.css'

<<<<<<< Updated upstream
function Notifications({avatar, displayName, text, type}) {
    return(
        <div className="notification-container">
            <Avatar src={avatar} className="notification-avatar"/>
            <span className="notification-username">{displayName}:</span>
=======
function Notifications({avatar, display_name, text, type, post_id, user_id, reaction_type, activity_date}) {
    return(
        <div className="notification-container">
            <Avatar src={avatar} className="notification-avatar"/>
            <span className="notification-username">{display_name}:</span>
>>>>>>> Stashed changes
            <div className={`notification ${type}`}>
                <div className="notification-body">
                    <span className="notification-text">{text}</span>
                </div>
<<<<<<< Updated upstream
=======
                {reaction_type}{activity_date}
>>>>>>> Stashed changes
            </div>

        </div>
    );
}

export default Notifications;