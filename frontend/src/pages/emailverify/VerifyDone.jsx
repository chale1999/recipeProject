import React from 'react';
import { useHistory } from "react-router-dom";

function VerifyDone(){
    const history = useHistory();
    const toHomePage = () =>{ 
        let path = `./home`; 
        history.push(path);
    }
    return(
        <div>
            <h3> Verification Complete. Click the link below to go to the home page.</h3>
            <button onClick={toHomePage}>HOME!!!!!</button>
        </div>
    );
}

export default VerifyDone;