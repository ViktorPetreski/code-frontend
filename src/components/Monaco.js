import React from "react";

import {ControlledEditor} from "@monaco-editor/react";
import {Paper} from "@material-ui/core";

const BAD_WORD = "eval";
const WARNING_MESSAGE = " <- hey man, what's this?";

class Monaco extends React.Component {

    render() {
        const handleEditorChange = (ev, value) => {
            return value.includes(BAD_WORD) && !value.includes(WARNING_MESSAGE)
                ? value.replace(BAD_WORD, BAD_WORD + WARNING_MESSAGE)
                : value.includes(WARNING_MESSAGE) && !value.includes(BAD_WORD)
                    ? value.replace(WARNING_MESSAGE, "")
                    : value;
        };
        return (
            <Paper elevation={3}>
                <ControlledEditor
                    height="65vh"
                    value={"// Your script here\n"}
                    onChange={handleEditorChange}
                    language="javascript"
                />
            </Paper>
        );
    }
}

export default Monaco;