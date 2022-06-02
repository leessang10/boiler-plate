import React, {useEffect} from 'react';
import axios from "axios";

function LandingPage(props) {
    useEffect(() => {
        axios.get('/api/hello')
            .then(response => console.log(response.data));
    }, []);
    return (
        <div>
            <h1>LandingPage</h1>
        </div>
    );
}

export default LandingPage;
