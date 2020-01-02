import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import axios from "axios";
import {withStyles} from "@material-ui/core";


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

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    componentDidMount() {
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        };
        axios.get('http://34.67.168.202:8080/v1/exercises', config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleClick = () => {
        this.setState({open: !this.state.open})
    };

    render() {
        const {classes} = this.props;
        // const [open, setOpen] = React.useState(false);
        //
        // const handleClick = () => {
        //     setOpen(!open);
        // };

        return (
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="All subjects"/>
                </ListItem>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Selected subject"/>
                    {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder/>
                            </ListItemIcon>
                            <ListItemText primary="Exercise 1"/>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        );
    }
}

export default withStyles(useStyles)(NestedList);
