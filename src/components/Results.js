import React from 'react';
import Result from "./Result";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import {styled} from "@material-ui/styles";
import axios from "axios";

const MyDoneAllIcon = styled(DoneAllIcon)({
    color: '#49d66f',
    fontSize: 50,
});

class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputs: [],
            outputs: [],
        }
    }

    componentDidMount() {
        const {exerciseID} = this.props;
        console.log(`http://34.67.123.142/inputs/v1/inputs?exerciseID=${exerciseID}`);
        axios.get(`http://34.67.123.142/inputs/v1/inputs?exerciseID=${exerciseID}`)
            .then((response => this.setState({inputs: response.data})))
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const {inputs} = this.state;
        const getInputs = () => {
            const theResults = [];
            for (let data of inputs) {
                theResults.push(<Result key={data.ID} solved={data['solved'] || false} theInput={data.content}
                                        theOutput={data.theOutput || ""}/>)
            }
            return theResults;
        };


        const count = inputs.reduce(function (r, a) {
            return r + +(a.solved);
        }, 0);

        const exerciseSolved = count === inputs.length;
        let dividerStyle = {marginTop: 20};
        dividerStyle["backgroundColor"] = exerciseSolved ? "#49d66f" : "#f55b49";
        return (
            <div>
                {getInputs()}
                <Divider style={dividerStyle}/>
                <Container>
                    <Box m={2} style={{position: "absolute", right: 100, display: 'flex', alignItems: 'center'}}>
                        <Typography variant="h4" style={{marginRight: 10}}>
                            Solved: {count} / {inputs.length}
                        </Typography>
                        {exerciseSolved ? <MyDoneAllIcon/> : ""}
                    </Box>
                </Container>
            </div>
        );
    }
};

export default Results;