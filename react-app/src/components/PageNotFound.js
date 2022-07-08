import { Link } from "react-router-dom";
import pagenotfound from "../images/404Gif.gif";
import "./css/errorpage.css";
function PageNotFound() {
  // const dispatch = useDispatch()
  // const history = useHistory()

  return (
    <div className="errorPage">
      <div className="p-container">
        <h1 className="oops">Oops!</h1>
        <h2>We can't seem to find the page you're looking for.</h2>
        <Link to={`/`}>
          Go back home
        </Link>
      </div>
      <div className="gif">
        <div className="gif-container">
          <img src={pagenotfound}/>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
