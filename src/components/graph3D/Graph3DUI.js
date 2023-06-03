import {useState} from "react"
import {useCallback} from "react";
import MyCheckBox from "../myCheckBox/MyCheckBox";
import { 
    Cube,
    Ellipsoid,
    Sphere, 
    Toroid, 
    EllipticalCylinder, 
    EllipticalParaboloid, 
    HyperbolicCylinder, 
    OneSheetedHyperboloid, 
    ParabolicCylinder, 
    SingleHyperboloid,
    TwoSheetedHyperboloid 
} from "../modules/Math3D";

const Graph3DUI = ({show, updateVarPoints, updateVarEdges, updateVarPolygons, updateScene}) => {
    const [showPanel, setShowPanel] = useState(false);
    const figures= {
        Cube: new Cube(),
        Sphere: new Sphere(),
        Toroid: new Toroid(),
        Ellipsoid: new Ellipsoid(),
        EllipticalCylinder: new EllipticalCylinder(),
        EllipticalParaboloid: new EllipticalParaboloid(),
        HyperbolicCylinder: new HyperbolicCylinder(),
        OneSheetedHyperboloid: new OneSheetedHyperboloid(),
        ParabolicCylinder: new ParabolicCylinder(),
        SingleHyperboloid: new SingleHyperboloid(),
        TwoSheetedHyperboloid: new TwoSheetedHyperboloid(),
    }
    const showHidePanel = useCallback(() => {
        setShowPanel(!showPanel)},
        [setShowPanel,showPanel]
    );
    const selectFigure = useCallback((event) => {
        updateScene(figures[event.target.value])},
        [updateScene, figures]);
    return (
        <div>
            <button onClick={showHidePanel}>
                {showPanel? '<-':'->'}
            </button>
            {
                showPanel&&(<div>
                    <MyCheckBox
                        text = 'Точки'
                        checked = {show.pointCheck}
                        onClick={updateVarPoints}
                        />
                    <MyCheckBox
                        text = 'Ребра'
                        checked = {show.edgeCheck}
                        onClick = {updateVarEdges}
                        />
                    <MyCheckBox
                        text = 'Полигоны'
                        checked = {show.polygonsCheck}
                        onClick = {updateVarPolygons}
                        />
                    </div>)
            }
            <div>
                <select onChange={selectFigure}>
                    {Object.keys(figures).map((key, index) => (
                        <option
                        key = {index}
                        className="figure"
                        value = {key}>{key}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Graph3DUI;