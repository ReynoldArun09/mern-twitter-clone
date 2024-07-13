import PropsTypes from "prop-types";

const Dialog = ({ children }) => {
  return <section>{children}</section>;
};

Dialog.propTypes = {
  children: PropsTypes.node.isRequired,
};

const DialogTrigger = ({ children }) => {
  return (
    <button
      className="btn btn-outline rounded-full btn-sm"
      onClick={() => document.getElementById("edit_profile_modal").showModal()}
    >
      {children}
    </button>
  );
};
DialogTrigger.propTypes = {
  children: PropsTypes.node.isRequired,
};

const DialogContainer = ({ children }) => {
  return (
    <dialog id="edit_profile_modal" className="modal">
      <div className="modal-box border rounded-md border-gray-700 shadow-md">
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="outline-none">close</button>
      </form>
    </dialog>
  );
};

DialogContainer.propTypes = {
  children: PropsTypes.node.isRequired,
};

const DialogTitle = ({ children }) => {
  return <h3 className="font-bold text-lg my-3">{children}</h3>;
};

DialogTitle.propTypes = {
  children: PropsTypes.node.isRequired,
};

export { Dialog, DialogTrigger, DialogContainer, DialogTitle };
