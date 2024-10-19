import "./Infobox.css";

interface InfoboxProps {
  header: string
  text: string
}

const Infobox = (props: InfoboxProps) => {
  const {text, header} = props;

  return (
    <div className="infobox">
      <h2>{header}</h2>
      {text.split(";").map((txt) => {
        return (<div key={txt} className="text">{txt === "" ? <br/> : txt}</div>)
      })}
    </div>
  );
}

export default Infobox;