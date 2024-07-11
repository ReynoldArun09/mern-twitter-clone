import { forwardRef } from "react";

const Input = forwardRef(({...props}, ref) => {
  return <input ref={ref} {...props} />;
});

Input.displayName = "Input";

export default Input;
