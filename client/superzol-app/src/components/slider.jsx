import * as React from 'react';
import Slider from '@mui/material/Slider';
import {SliderContainer, SliderLabel, SliderLabelContainer} from "./slider.styled";
import {DARK_BLUE} from "../utils/colors";

const MAX = 20;
const MIN = 1;
const marks = [
    {
        value: MIN,
        label: '',
    },
    {
        value: MAX,
        label: '',
    },
];

export default function CustomMarks({value, onChange}) {
    const handleChange = (_, newValue) => {
        onChange(newValue);
    };

    return (
        <SliderContainer>
            <Slider
                marks={marks}
                step={1}
                value={value}
                valueLabelDisplay="auto"
                min={MIN}
                max={MAX}
                onChange={handleChange}
                color={DARK_BLUE}
            />
            <SliderLabelContainer>
                <SliderLabel
                    onClick={() => onChange(MIN)}
                >
                    {MIN} KM
                </SliderLabel>
                <SliderLabel
                    onClick={() => onChange(MAX)}
                >
                    {MAX} KM
                </SliderLabel>
            </SliderLabelContainer>
        </SliderContainer>
    );
}
