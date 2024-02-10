import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Box} from "@mui/material";


//props will be options, day, handleDayChange
export default function SelectorMenu({ label, options, value, handleChange }) {
    return (
        <div>
            <FormControl sx={{width: 1, paddingTop:1, paddingBottom: 1}}>
                <InputLabel>{label}</InputLabel>
                <Select                     
                    value={value}
                    label={label}
                    onChange={handleChange}                                
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label ? <em>{option.label}</em> : option.value}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>Choose {label}</FormHelperText>
            </FormControl>            
        </div>
    );
}