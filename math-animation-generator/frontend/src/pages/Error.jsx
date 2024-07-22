// import Wrapper from "../assets/wrappers/ErrorPage"
import { Link, useRouteError } from "react-router-dom"
import img from "../assets/error-not-found.svg"
const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404){
    return(
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh!</h3>
        <p>We can't seem to find the page you are looking for</p>
        <Link to="/">back home</Link>
      </div>
    );
  }

  return (
    <div>
      <h3>Something went wrong</h3>
    </div>
  );
}
export default Error