import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// ----------------------------------------------------------------------

RHFUpdateImage.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default function RHFUpdateImage({ name, handleChange, label, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      {...other}
      render={({ field, fieldState }) => {
        return (
          <>
            <label>{label}</label>
            <div className="custom-file">
              <input
                {...field}
                accept="image/png, image/gif, image/jpeg"
                type="file"
                className="custom-file-input"
                id="customFile"
                value={""}
                onChange={(e) => {
                  field.onChange(e.target.files[0]); // Save the FileList object
                }}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {field.value && typeof field.value !== "object" && (field.value || field.value)}
                {field.value && typeof field.value === "object" && (field.value?.name || field.value)}
                {!field.value && typeof field.value === "object" && ('upload Image')}
              </label>
            </div>
          </>
        );
      }}
    />
  );
}
