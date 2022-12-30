export interface HeaderProps {
    text: string
}

const Header = (props: HeaderProps) => {
    const {text} = props;
    return (
        <h1 className="row">Path of Exile Regex - {text}</h1>
    )
}

export default Header;