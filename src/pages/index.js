import React from "react"
import Header from "../components/header"
import Chart from "../components/chart"
import json_data from "../../static/data/data.json"

class IndexComponent extends React.Component {
    constructor(props) {
        super(props);
        json_data.forEach(entry => entry.Date = new Date(entry.Date));
        this.state = json_data;
    }

    render(){
        return (
        <div style={{ color: `purple` }}>
            <Header headerText="Covid-19 Chart" />
            <Chart data={this.state} />
        </div>
        );
    }
}

export default IndexComponent
