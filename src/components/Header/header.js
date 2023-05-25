import React from "react";
// import './App.css'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.showComponent = props.showComponent;
    }
    render() {
        return(<div className="header">
            <button onClick = {() =>
            this.showComponent('calculator')}
            > Calculator </button>
            <button onClick = {() =>
            this.showComponent('graph2D')}
            > Graph2D </button>
            <button onClick = {() =>
            this.showComponent('graph3D')}
            > Graph3D </button> 
        </div>);
    }
}