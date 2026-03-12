import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default function RHFDatePicker({ name, label, disablePast, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name || ""}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={typeof field.value === "object" ? field.value : new Date(field.value)}
            {...other}
            name={name || ""}
            onChange={field.onChange}
            disablePast
            label={label}
          />
        </LocalizationProvider>
      )}
    />
  );
}
