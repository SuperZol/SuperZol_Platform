import React from "react";
import {BoxIconStyled, FormBox, FormContainer, StyledGrid, TitleBox, TypographyTitle} from "./form.styled";

const Form = ({title, func, children, icon: Icon}) => {
    return (
        <StyledGrid container>
            <TitleBox>
                <TypographyTitle>
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
