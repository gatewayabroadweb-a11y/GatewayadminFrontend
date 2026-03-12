import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";

export default function RHFRadio({ name, title, labels, handleChange }) {
  const { control } = useFormContext();

  return (
    <div className="mb-3">
      {title && (
        <label className="form-label d-block fw-semibold text-dark mb-2">
          {title}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            {labels.map((item) => (
              <div className="form-check form-check-inline" key={item.value}>
                <input
                  className={`form-check-input ${error ? "is-invalid" : ""}`}
                  type="radio"
                  id={`${name}-${item.value}`}
                  value={item.value}
                  checked={field.value === item.value}
                  onChange={(e) => {
                    field.onChange(e);
                    if (typeof handleChange === "function") {
                      handleChange(e);
                    }
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`${name}-${item.value}`}
                >
                  {item.name}
                </label>
              </div>
            ))}
            {error && (
              <div className="invalid-feedback d-block">{error.message}</div>
            )}
          </>
        )}
      />
    </div>
  );
}

RHFRadio.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  labels: PropTypes.array.isRequired,
  handleChange: PropTypes.func,
};
