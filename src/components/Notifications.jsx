import { Avatar } from '@mui/material';
import '../components/Notifications.css'

function Notifications({avatar, displayName, text, type}) {
    return(
        <div className="notification-container">
            <Avatar src={avatar} className="notification-avatar"/>
            <span className="notification-username">{displayName}:</span>
            <div className={`notification ${type}`}>
                <div className="notification-body">
                    <span className="notification-text">{text}</span>
                </div>
            </div>

        </div>
    );
}

export default Notifications;