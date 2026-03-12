import * as React from "react";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import classNames from "classnames";

RHFSelectbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default function RHFSelectbox({ name, label, menus, required = false, onChange }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <div className="d-block">
          {label && <label className="form-label">{label}</label>}
          <select
            {...field}
            className={classNames("form-control", { "is-invalid": error })}
            onChange={(e) => {
              field.onChange(e);
              if (onChange && typeof onChange === "function") {
                onChange(e);
              }
            }}
            required={required}
          >
            <option value="" disabled>
              -- Select one --
            </option>
            {menus.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
          {error && <div className="invalid-feedback">{error.message}</div>}
        </div>
      )}
    />
  );
}
