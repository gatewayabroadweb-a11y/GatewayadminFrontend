import PropTypes from "prop-types";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useFormContext, Controller } from "react-hook-form";

export default function RHFPhoneNumberInput({ name, label }) {
  const { control } = useFormContext();

  return (
    <div className="d-block">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{
          validate: (value) =>
            isValidPhoneNumber(value) || "Invalid phone number",
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              id={name}
              type="tel"
              className={`form-control ${error ? "is-invalid" : ""}`}
              placeholder="Enter phone number"
            />
            {error && <div className="invalid-feedback">{error.message}</div>}
          </>
        )}
      />
    </div>
  );
}

RHFPhoneNumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
