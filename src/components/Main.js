import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Monaco from "./Monaco";
import {makeStyles} from "@material-ui/core/styles";
import Results from "./Results";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(15),
        paddingLeft: theme.spacing(12),
        paddingRight: theme.spacing(12),
        paddingBottom: theme.spacing(5)
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    buttonGridPadding: {
        paddingTop: 25,
    }
}));
export default function Main(props) {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={3} className={classes.content} alignItems="flex-start" justify="flex-end"
                  direction="row">
                <Grid item xs={12}>
                    <Typography paragraph>
                        {props.exercise.content || "Choose exercise"}
                    </Typography>
                </Grid>
                {props.exercise.content != null ?
                    <Grid item xs={12}>
                        <Monaco exerciseID={props.exercise.exerciseID}/>
                    </Grid>
                    : ""}
                {props.exercise.content != null ?
                    <Grid item xs={12}>
                        <Results exerciseID={props.exercise.exerciseID}/>
                    </Grid> : ""}
            </Grid>


        </React.Fragment>
    );
}
