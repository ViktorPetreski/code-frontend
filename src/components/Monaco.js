import React from "react";

import Editor from "@monaco-editor/react";
import {Paper, withStyles} from "@material-ui/core";
import axios from "axios";
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import moment from 'moment'
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = theme => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});

class Monaco extends React.Component {

    static propTypes = {
        exerciseID: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            code: "// Your script here\n",
            ide: null,
            history: '',
        };
        this.myRef = React.createRef();
    }

    componentDidMount() {
        const {exerciseID} = this.props;
        axios.get(`http://34.67.123.142/script/v1/script/${exerciseID}`)
            .then(response => this.setState({ide: response.data, code: response.data.code}))
            .catch(error => console.log(error));
    }

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
        axios.patch(`http://34.67.123.142/script/v1/script/revert?historyID=${event.target.value}`)
            .then(result => this.setState({code: result.data.code}))
            .catch(error => console.log(error));
    };

    handleEditorDidMount = event => {
        this.myRef.current = event;
    };

    handleRun = () => {
        this.setState({code: this.myRef.current()});
        const {ide} = this.state;
        const object = {
            "code": this.myRef.current()
        };
        console.log(object);
        if (ide != null) {
            axios.patch(`http://34.67.123.142/script/v1/script/${ide.ID}`, object)
                .then(response => this.setState({ide: response.data}))
                .catch(error => console.log(error));
        } else {
            object["exerciseID"] = this.props.exerciseID;
            axios.post("http://34.67.123.142/script/v1/script", object)
                .then(response => this.setState({ide: response.data}))
                .catch(error => console.log(error));
        }
    };

    render() {
        const {classes} = this.props;
        const {ide, code, history} = this.state;

        const codeHistory = [];
        codeHistory.push(<option key={-1} value=""/>);
        if (ide != null) {

            for (let h of ide.codeHistory) {
                codeHistory.push(
                    <option key={h.ID} value={h.ID}>{moment(h.submitTime).format("DD/MM/YY HH:mm:ss")}</option>
                )
            }
        }
        return (
            <React.Fragment>
                <Paper elevation={3}>
                    <Editor
                        height="65vh"
                        value={code}
                        editorDidMount={this.handleEditorDidMount}
                        language="python"
                    />
                </Paper>
                <Grid container spacing={1}>
                {ide != null ?
                    <Grid item xs={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">History</InputLabel>
                            <Select
                                native
                                value={history}
                                onChange={this.handleChange('history')}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-native-simple',
                                }}
                            >
                                {codeHistory}
                            </Select>
                        </FormControl>
                    </Grid>
                    : ""}
                    <Grid item xs={1}>
                        <Button
                            variant="contained"
                            color="default"
                            className={classes.button}
                            endIcon={<Icon>send</Icon>}
                            onClick={this.handleRun}>
                            Run
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<SaveIcon/>}
                            onClick={this.handleSave}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(Monaco);