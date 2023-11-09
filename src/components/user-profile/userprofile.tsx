import React from "react";
import "./user-profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export interface UserProfileProps {
  profileType: "waiter" | "administrator" | "cook";
  waiterName: string;
  administratorName: string;
  cookName: string;
  onLogoutClick: () => void;
  onBackClick?: () => void;
  showBackButton?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  profileType,
  waiterName,
  administratorName,
  cookName,
  onLogoutClick,
  onBackClick,
  showBackButton
}) => {
  const getWelcomeText = () => {
    switch (profileType) {
      case "administrator":
        return `Welcome administrator ${administratorName}`;
      case "cook":
        return `Welcome cook ${cookName}`;
      default:
        return `Welcome Waiter ${waiterName}`;
    }
  };

  return (
    <div className="user-profile">
      <div className="left">
        <img src="../img2/BURGER QUEEN.jpg" alt="Logo" />
      </div>
      <div className="center">
        <h2>{getWelcomeText()}</h2>
      </div>
      <div className="right">
      {showBackButton && onBackClick && (
        <button onClick={onBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} className="icon" />
        </button>
         )}
        <button onClick={onLogoutClick}>
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
