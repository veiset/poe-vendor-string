export interface HeaderProps {
    text: string
}

const Header = (props: HeaderProps) => {
    const {text} = props;
    return (
        <div className="item-wide info-header">Path of Exile Regex - {text}</div>
    )
}

export default Header;