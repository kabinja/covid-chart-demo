import React from "react"
import d3_timeseries from "d3-timeseries"

class ChartComponent extends React.Component {    
    constructor(props){
        super(props);

        this.state = {
            show_cases: true,
            show_hospital: true,
            show_critical: true,
            show_deaths: true,
            show_ci: true
        }
    }
    
    componentDidMount() {
        this.drawChart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state || prevProps !== this.props) {
            this.drawChart();
        }
    }

    drawChart(){
        let chart = d3_timeseries();

        let series_counter = this.addSeries(chart, 'SimulationCases', 'number cases', '#a6cee3', this.state.show_cases);
        series_counter += this.addSeries(chart, 'SimulationHospital', 'number hospitalized', '#00ff22', this.state.show_hospital);
        series_counter += this.addSeries(chart, 'SimulationCritical', 'number critical', '#ff7700', this.state.show_critical);
        series_counter += this.addSeries(chart, 'SimulationDeaths', 'number deaths', '#ff0008', this.state.show_deaths);

        if(series_counter === 0){
            console.log("empty series")
            this.setState({
                show_cases: true,
                show_hospital: true,
                show_critical: true,
                show_deaths: true
            });
        }
        else{
            chart
                .margin({top: 10, bottom: 20, left: 60, right: 10})
                .width(1420);
        

            document.getElementById('chart').innerHTML = '';
            document.getElementsByClassName('d3_timeseries tooltip').innerHTML = '';
            chart('#chart');
        }
    }

    addSeries(chart, column, label, color, show){
        if(show){
            if(this.state.show_ci){
                chart.addSerie(this.props.data, {x:'Date',y:column,ci_up:column + '_max',ci_down:column + '_min'}, {interpolate:'linear', color:color,label:label});
            }
            else{
                chart.addSerie(this.props.data, {x:'Date',y:column}, {interpolate:'linear', color:color,label:label});
            }

            return 1;
        }

        return 0;
    }

    handleToggle(e){
        switch (e.target.id) {
            case "toggle-cases": this.setState(state => ({show_cases: !state.show_cases})); break;
            case "toggle-hospital": this.setState(state => ({show_hospital: !state.show_hospital})); break;
            case "toggle-critical": this.setState(state => ({show_critical: !state.show_critical})); break;
            case "toggle-deaths": this.setState(state => ({show_deaths: !state.show_deaths})); break;
            case "toggle-ci": this.setState(state => ({show_ci: !state.show_ci})); break;
            default: console.error("unhandled event: " + e.target.id); break;
        }
    }

    render() {
        return (
            <div id="chart-area"> 
                <button id="toggle-cases" onClick={(e) => this.handleToggle(e)}>{this.state.show_cases ? 'HIDE CASES' : 'SHOW CASES'}</button>
                <button id="toggle-hospital" onClick={(e) => this.handleToggle(e)}>{this.state.show_hospital ? 'HIDE HOSPITLIZATIONS' : 'SHOW HOSPITALIZATIONS'}</button>
                <button id="toggle-critical" onClick={(e) => this.handleToggle(e)}>{this.state.show_critical ? 'HIDE CRITICAL CASES' : 'SHOW CRITICAL CASES'}</button>
                <button id="toggle-deaths" onClick={(e) => this.handleToggle(e)}>{this.state.show_deaths ? 'HIDE DEATHS' : 'SHOW DEATHS'}</button>
                <button id="toggle-ci" onClick={(e) => this.handleToggle(e)}>{this.state.show_ci ? 'HIDE CONFIDENCE INTERVALS' : 'SHOW CONFIDENCE INTERVALS'}</button>

                <div id="chart"></div>

            </div>
        )
    }
}

export default ChartComponent