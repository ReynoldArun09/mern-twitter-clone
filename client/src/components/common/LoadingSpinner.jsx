import PropTypes from "prop-types";

LoadingSpinner.propTypes = {
  size: PropTypes.string,
};

export default function LoadingSpinner({ size = "md" }) {
  const sizeClass = `loading-${size}`;
  return <span className={`loading loading-spinner ${sizeClass}`} />;
}
