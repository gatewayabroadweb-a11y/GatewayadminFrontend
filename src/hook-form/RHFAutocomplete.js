import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, Chip, FormControl, TextField } from '@mui/material';
// ----------------------------------------------------------------------

RHFAutocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  handleChange: PropTypes.func,
  options: PropTypes.array,
  InputProps: PropTypes.node,
};

export default function RHFAutocomplete({ name, label, handleChange, options, type, onBlur, InputProps, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          options={options || []}
          multiple
          getOptionLabel={(option) => option.email}
          onChange={(e, data) => field.onChange(data)}
          onBlur={onBlur || field.onBlur}
          value={field.value || []}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              type={type}
              onChange={handleChange}
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{InputProps}</>,
              }}
              label={label} error={!!error} helperText={error?.message} />
          )}
          renderTags={(value, getTagProps) =>
            (value || []).map((option, index) => (
              <FormControl key={index}>
                <Chip variant="outlined" label={option.email || option} {...getTagProps({ index })} />
              </FormControl>
            ))
          }
          {...other}
        />
      )}
    />
  );
}
