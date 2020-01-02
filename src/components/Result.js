import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


class Result extends Component {
    render() {
        const success = {
            borderLeftWidth: 5,
            borderLeftColor: "#49d66f",
            borderLeftStyle: "solid",
        };

        const fail = {
            borderLeftWidth: 5,
            borderLeftColor: "#f55b49",
            borderLeftStyle: "solid",
        };
        const {solved, theInput, theOutput} = this.props;

        return (
            <div>
                <Grid container spacing={3} direction="row"
                      justify="center"
                      alignItems="center"
                >
                    <Grid item xs={5}>
                        <Paper elevation={3}>
                            <Box component="div" p={3}>
                                <Typography>
                                    {theInput || "The input"}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper style={solved ? success : fail} elevation={3}>
                            <Box component="div" p={3}>
                                <Typography>
                                    {theOutput || "The output"}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default Result;