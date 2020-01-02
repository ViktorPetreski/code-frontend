import React from 'react';
import Result from "./Result";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import {styled} from "@material-ui/styles";

const MyDoneAllIcon = styled(DoneAllIcon)({
    color: '#49d66f',
    fontSize: 50,
});

const Results = () => {
    const theResults = [];

    const demoData = [
        {
            "id": 1,
            "solved": true,
            "theInput": "Lodi",
            "theOutput": "Lodi"
        },
        {
            "id": 2,
            "solved": false,
            "theInput": "Lodi",
            "theOutput": "Smole"
        }
    ];
    for (let data of demoData) {
        theResults.push(<Result key={data.id} solved={data['solved']} theInput={data.theInput}
                                theOutput={data.theOutput}/>)
    }

    const count = demoData.reduce(function (r, a) {
        return r + +(a.solved);
    }, 0);
    const exerciseSolved = count === demoData.length;
    let dividerStyle = {marginTop: 20};
    dividerStyle["backgroundColor"] = exerciseSolved?  "#49d66f": "#f55b49";
    return (
        <div>
            {theResults}
            <Divider style={dividerStyle}/>
            <Container>
                <Box m={2} style={{position:"absolute", right:100, display: 'flex', alignItems: 'center'}}>
                    <Typography variant="h4" style={{marginRight: 10}}>
                        Solved: {count} / {demoData.length}
                    </Typography>
                    {exerciseSolved? <MyDoneAllIcon/> : ""}
                </Box>
            </Container>
        </div>
    );
};

export default Results;