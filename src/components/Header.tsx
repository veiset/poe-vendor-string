import './Header.css';

export interface HeaderProps {
  text: string
}

const Header = (props: HeaderProps) => {
  const {text} = props;
  return (
    <h1 className="row page-header">{text} Regex</h1>
  )
}

export default Header;