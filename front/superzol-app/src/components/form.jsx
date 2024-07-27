import React from "react";
import {Grid, Box, Typography} from "@mui/material";

const Form = ({title, func, children, icon: Icon}) => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="grid-container"
        >
            <Box sx={{display: 'flex', alignItems: 'center', mb: 3}}>
                <Typography variant="h3" className="title" sx={{display: 'flex', alignItems: 'center'}}>
                    {title}
                    {Icon && (
                        <Box sx={{display: 'inline-flex', alignItems: 'center', ml: 2}}>
                            <Icon sx={{fontSize: 36}}/>
                        </Box>
                    )}
                </Typography>
            </Box>
            <Box className="box">
                <form onSubmit={func} className="form">
                    {children}
                </form>
            </Box>
        </Grid>
    );
};

export default Form;
