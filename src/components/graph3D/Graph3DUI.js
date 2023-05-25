import React from "react"

export default class Graph3DUI extends React.Component{
    constructor(props) {
        super(props);
        this.showHidePoints = props.showHidePoints;
        this.showHideEdge = props.showHideEdge;
        this.showHidePolygons = props.showHidePolygons;
        this.state = {showPanel: false};
    }
    showHidePanel() {
        this.setState({showPanel: !this.state.showPanel});
    }
    render() {
        return(<div>
            <button onClick={() => this.showHidePanel()}>{this.state.showPanel ? '<-':'->'}
            </button>
            {this.state.showPanel &&<div>
                <input
                    id = 'point=checkbox'
                    type = 'checkbox'
                    onClick = {(event) => this.showHidePoints(event.target.checked)}
                />
                <input
                    id = 'edges=checkbox'
                    type = 'checkbox'
                    onClick = {(event) => this.showHidePoints(event.target.checked)}
                />
                <input
                    id = 'polygons=checkbox'
                    type = 'checkbox'
                    onClick = {(event) => this.showHidePoints(event.target.checked)}
                />
                <label
                htmlFor="points=checkbox">Точки</label>
                <label
                htmlFor="edges=checkbox">Грани</label>
                <label
                htmlFor="polygons=checkbox">Полигоны</label>
            </div>}
        </div>)
    }
}