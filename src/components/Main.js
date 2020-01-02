import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Monaco from "./Monaco";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
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
    buttonGridPadding:{
        paddingTop: 25,
    }
}));
export default function Main() {

    const classes = useStyles();

    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });


    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <React.Fragment>
            <Grid container spacing={3} className={classes.content} alignItems="flex-start" justify="flex-end" direction="row">
                <Grid item xs={12}>
                    <Typography paragraph>
                        Exercise text
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Monaco/>
                </Grid>
                <Grid item xs={10}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">History</InputLabel>
                        <Select
                            native
                            value={state.age}
                            onChange={handleChange('age')}
                            inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                            }}
                        >
                            <option value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1} style={{paddingTop: 25}}>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        endIcon={<Icon>send</Icon>}>
                        Run
                    </Button>
                </Grid>
                <Grid item xs={1} style={{paddingTop: 25}}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon/>}>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Results/>
                </Grid>

            </Grid>


        </React.Fragment>
    );
}
