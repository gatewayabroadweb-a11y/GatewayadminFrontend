import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";

RHFTextField.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  label: PropTypes.string,
  required: PropTypes.bool,
  onBlur: PropTypes.func,
};

export default function RHFTextField({ name, label, handleChange, required, onBlur, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name || ''}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <label>{label}</label>
          <input
            required={required}
            {...field}
            onBlur={onBlur || field.onBlur}
            type="text"
            className={`form-control ${error ? "is-invalid" : ""}`}
            value={typeof field.value === "number" && field.value === 0 ? "" : field.value || ''}
            onChange={(...d) => {
              field.onChange(...d);
              if (handleChange && typeof handleChange === "function") {
                handleChange(...d);
              }
            }}
            placeholder={label}
          />
          {error && <div className="invalid-feedback">{error.message}</div>}
        </>
      )}
    />
  );
};