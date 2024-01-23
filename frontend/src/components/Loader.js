import { Spinner } from "react-bootstrap";

const Loader = () => (
  <Spinner
    animation="border"
    role="status"
    style={{ width: 100, height: 100, margin: "auto", display: "block" }}
  />
);
export default Loader;
