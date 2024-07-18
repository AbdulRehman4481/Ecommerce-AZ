import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { ALLIMEGES } from "../../constants/assets/img";

const Logo = ({ imageUrl, logoClass }) => {
  return (
    <div className={clsx(logoClass)} >
      <Link to={process.env.PUBLIC_URL + "/"}>
        {/* <img alt="" src={process.env.PUBLIC_URL + imageUrl} /> */}
       <div className="d-flex flex-row align-items-center">
       <img src={ALLIMEGES.BRANDLOGO} alt="brandLogo" className="img-fluid w-25"/>
       <p className="fs-4 ms-1">E-Market</p>
       </div>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;
