import {styled} from '@mui/material/styles';
import {Box, Container, Typography} from '@mui/material';

export const StyledContainer = styled(Container)`
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
`


export const StyledContentBox = styled(Box)`
    width: 100%;
    max-width: 600px;
`

export const StyledSliderBox = styled(Box)`
    display: flex;
    justify-content: center;
`;


export const StyledSliderTitle = styled(Typography)`
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
`;


export const StyledButtonBox = styled(Box)`
    margin-top: 4px;
    display: flex;
    justify-content: center;
`;