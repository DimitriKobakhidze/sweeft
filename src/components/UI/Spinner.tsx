import "./spinner.css";

const Spinner = ({ light = false }) => {
  return <span className={light ? "loader light" : "loader"}></span>;
};

export default Spinner;
