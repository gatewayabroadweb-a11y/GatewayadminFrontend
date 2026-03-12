import * as React from "react";
import PropTypes from "prop-types";

import { useFormContext, Controller } from "react-hook-form";
import { FormHelperText, Switch, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

RHFSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  labels: PropTypes.string.isRequired,
};

export default function RHFSwitch({ name, labels }) {
  const CustomSwitch = React.useMemo(
    () =>
      styled((props) => (
        <Switch
          focusVisibleClassName=".Mui-focusVisible"
          disableRipple
          {...props}
        />
      ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        "& .MuiSwitch-switchBase": {
          padding: 0,
          margin: 2,
          transitionDuration: "300ms",
          "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor:
                theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
              opacity: 1,
              border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              opacity: 0.5,
            },
          },
          "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff",
          },
          "&.Mui-disabled .MuiSwitch-thumb": {
            color:
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
          },
        },
        "& .MuiSwitch-thumb": {
          boxSizing: "border-box",
          width: 22,
          height: 22,
        },
        "& .MuiSwitch-track": {
          borderRadius: 26 / 2,
          backgroundColor:
            theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
          opacity: 1,
          transition: theme.transitions.create(["background-color"], {
            duration: 500,
          }),
        },
      })),
    []
  );

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormControlLabel
            control={
              <CustomSwitch
                checked={field.value}
                {...field}
                sx={{ mx: 1 }}
                name={name}
              />
            }
            label={labels}
          />
          <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        </>
      )}
    />
  );
}
