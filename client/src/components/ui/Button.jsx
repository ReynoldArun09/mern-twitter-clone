import PropTypes from "prop-types";

Button.propTypes = {
  BtnType: PropTypes.string,
  text: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
};

export default function Button({ BtnType, text, ariaLabel }) {
  return (
    <button
      type={BtnType}
      aria-label={ariaLabel}
      className="btn rounded-full btn-primary text-white btn-outline w-full"
    >
      {text}
    </button>
  );
}
