import React from "react";
import {BoxIconStyled, FormBox, FormContainer, StyledGrid, TitleBox, TypographyTitle} from "./form.styled";

const Form = ({title, func, auth, children, icon: Icon}) => {
    return (
        <StyledGrid container direction="column" justifyContent="center" alignItems="center">

            <TitleBox>
                <TypographyTitle variant="h3" auth={auth}>
                    {title}
                    {Icon && (
                        <BoxIconStyled>
                            <Icon sx={{fontSize: 36}}/>
                        </BoxIconStyled>
                    )}
                </TypographyTitle>
            </TitleBox>
            <FormBox>
                <FormContainer onSubmit={func}>
                    {children}
                </FormContainer>
            </FormBox>
        </StyledGrid>
    );
};

export default Form;
