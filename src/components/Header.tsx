import './Header.css';
import Profile from "./profile/Profile";

export interface HeaderProps {
  text: string
}

const Header = (props: HeaderProps) => {
  const {text} = props;
  return (
    <div className="page-header-container">
      <h1 className="page-header">{text} Regex</h1>
      <div className="page-header-profile">
        <Profile/>
      </div>
    </div>
  )
}

export default Header;