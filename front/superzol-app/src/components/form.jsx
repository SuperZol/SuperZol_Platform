import React from "react";
import {Grid, Box, Typography} from "@mui/material";

const Form = ({title, func, children}) => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="grid-container"
        >
            <Typography variant="h3" className="title" gutterBottom>
                {title}
            </Typography>
            <Box className="box">
                <form onSubmit={func} className="form">
                    {children}
                </form>
            </Box>
        </Grid>
    );
};

export default Form;
