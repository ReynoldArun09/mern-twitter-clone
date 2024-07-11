import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import XSvg from "../common/XSvg";
import Button from "../ui/Button";

const AuthContainer = ({ children }) => {
  return (
    <section className="max-w-screen-xl mx-auto flex h-screen px-10">
      {children}
    </section>
  );
};

AuthContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const AuthHeader = () => {
  return (
    <div className="flex-1 hidden lg:flex items-center  justify-center">
      <XSvg className=" lg:w-2/3 fill-white" />
    </div>
  );
};

const AuthContent = ({ children }) => {
  return (
    <section className="flex-1 flex flex-col justify-center items-center">
      {children}
    </section>
  );
};

AuthContent.propTypes = {
  children: PropTypes.node.isRequired,
};

const AuthFooter = ({ type }) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <p className="text-white text-lg">
        {type === "register"
          ? "Dont have an account?"
          : "Already have an account?"}
      </p>
      <Link to={`/${type === "register" ? "login" : "register"}`}>
        <Button
          BtnType={"button"}
          ariaLabel={
            type === "register" ? "go to login page" : "go to register page"
          }
          text={type === "register" ? "Login" : "Register"}
        />
      </Link>
    </div>
  );
};

AuthFooter.propTypes = {
  type: PropTypes.oneOf(["register", "login"]).isRequired,
};

export { AuthContainer, AuthFooter, AuthHeader, AuthContent };
