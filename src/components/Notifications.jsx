import { Avatar } from '@mui/material';
import '../components/Notifications.css'

function Notifications({avatar, display_name, text, type, post_id, user_id, reaction_type, activity_date}) {
    return(
        <div className="notification-container">
            <Avatar src={avatar} className="notification-avatar"/>
            <span className="notification-username">{display_name}:</span>
            <div className={`notification ${type}`}>
                <div className="notification-body">
                    <span className="notification-text">{text}</span>
                </div>
                {reaction_type}{activity_date}
            </div>

        </div>
    );
}

export default Notifications;