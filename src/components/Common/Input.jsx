import PropTypes from "prop-types";

function Input({
  placeholder,
  type,
  value,
  onChange,
  required = false,
  className,
  checked,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={className}
      checked={checked}
    />
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  className: PropTypes.string,
  checked: PropTypes.bool,
};

export default Input;
