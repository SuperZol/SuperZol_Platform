import React from "react";
import {Box} from "@mui/material";
import {BoxIconStyled, BoxStyle, FormStyle, StyledGrid, TypographyTitle} from "./form.styled";

const Form = ({title, func, children, icon: Icon}) => {
    return (
        <StyledGrid container direction="column" justifyContent="center" alignItems="center">

            <Box sx={{display: 'flex', alignItems: 'center', mb: 3}}>
                <TypographyTitle variant="h3">
                    {title}
                    {Icon && (
                        <BoxIconStyled>
                            <Icon sx={{fontSize: 36}}/>
                        </BoxIconStyled>
                    )}
                </TypographyTitle>
            </Box>
            <BoxStyle>
                <FormStyle onSubmit={func}>
                    {children}
                </FormStyle>
            </BoxStyle>
        </StyledGrid>
    );
};

export default Form;
