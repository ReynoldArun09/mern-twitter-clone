import PropsTypes from "prop-types";

Label.propTypes = {
  children: PropsTypes.node.isRequired,
};

export default function Label({ children }) {
  return (
    <label className="input input-bordered rounded flex items-center gap-2 flex-1">
      {children}
    </label>
  );
}
