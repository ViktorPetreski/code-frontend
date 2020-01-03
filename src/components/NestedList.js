import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AssignmentIcon from '@material-ui/icons/Assignment';
import axios from "axios";
import {withStyles} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';


import PropTypes from 'prop-types';


const useStyles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

class NestedList extends Component {
    static propTypes = {
        onExerciseChange: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            exercises: [],
            selected: null,
        }
    }

    componentDidMount() {
        let self = this;
        axios.get('http://34.67.123.142/exercises/v1/exercises')
            .then((response => self.setState({exercises:response.data})))
            .catch(function (error) {
                console.log(error);
            });
    }

    handleClick = () => {
        this.setState({open: !this.state.open})
    };

    handleExerciseClick = (exercise) => {
        this.setState({selected: exercise.exerciseID});
        this.props.onExerciseChange(exercise);
    };

    prepareExercises = () => {
        const {exercises} = this.state;
        const {classes} = this.props;
        const preparedData = [];
        for (let exercise of exercises) {
            preparedData.push(
                <ListItem key={exercise.exerciseID} button className={classes.nested} onClick={() => this.handleExerciseClick(exercise)} selected={this.state.selected === exercise.exerciseID}>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>
                    <ListItemText primary={exercise.description}/>
                </ListItem>
            )
        }
        // console.log(preparedData);
        return preparedData;
    };

    render() {
        // const {classes} = this.props;
        return (
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <SubjectIcon/>
                    </ListItemIcon>
                    <ListItemText primary="All subjects"/>
                </ListItem>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        <SubjectIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Selected subject"/>
                    {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {this.prepareExercises()}
                    </List>
                </Collapse>
            </List>
        );
    }
}
export default withStyles(useStyles)(NestedList);
