import React from "react";
import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getZipCode,
} from "use-places-autocomplete";
// ----------------------------------------------------------------------

const StyledTextField = styled(TextField)(() => ({
  "&.MuiFormControl-root": {
    borderColor: "#C6C6C6",
    borderRadius: 8,
  },

  '& label.Mui-focused': {
    color: '#3a1890'
  },
}));

RHFGoogleAddressTextField.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  label: PropTypes.string,
  onBlur: PropTypes.func,
};
export default function RHFGoogleAddressTextField({ name, label, handleChange, onBlur, ...other }) {
  const { control } = useFormContext();
  const {
    ready,
    suggestions: { data, loading },
    setValue,
    clearCache,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 1500
  });

  return (
    <Controller
      name={name || ''}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Autocomplete
            name={name}
            loading={loading}
            loadingText="loading"
            // disabled={!ready}
            options={data || []}
            getOptionLabel={(option) => `${option.structured_formatting?.main_text} ${option.structured_formatting?.secondary_text}`}
            onChange={(e, data) => {
              field.onChange(data);
              clearSuggestions();
              clearCache();
            }}
            onBlur={onBlur || field.onBlur}
            // value={field.value?.description}
            renderInput={(params) => (
              <StyledTextField
                {...params}
                fullWidth
                type={"text"}
                onChange={(e) => setValue(e.target.value)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                label={label} error={!!error} helperText={error?.message} />
            )}
            {...other}
          />
        </div>
      )}
    />
  );
};