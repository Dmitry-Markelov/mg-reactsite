import {useState} from "react"
import {useCallback} from "react";
import MyCheckBox from "../myCheckBox/MyCheckBox";
import { 
    Cube,
    Cone,
    Cylinder,
    Ellipsoid, 
    Sphere, 
    Toroid, 
    OneSheetedHyperboloid,
    EllipticalCylinder,
    EllipticalParaboloid,
    ParabolicCylinder,
    TwoSheetedHyperboloid,
    HyperbolicCylinder,
    HyperbolicParaboloid,
} from "../modules/Math3D";

const Graph3DUI = ({show, updateVarPoints, updateVarEdges, updateVarPolygons, updateScene}) => {
    const [showPanel, setShowPanel] = useState(false);
    const figures= {
        Cube: new Cube(),
        Cone: new Cone(),
        Cylinder: new Cylinder(),
        Ellipsoid: new Ellipsoid(),
        Sphere: new Sphere(),
        Toroid: new Toroid(),
        OneSheetedHyperboloid: new OneSheetedHyperboloid(),
        EllipticalCylinder: new EllipticalCylinder(),
        EllipticalParaboloid: new EllipticalParaboloid(),
        ParabolicCylinder: new ParabolicCylinder(),
        TwoSheetedHyperboloid: new TwoSheetedHyperboloid(),
        HyperbolicCylinder: new HyperbolicCylinder(),
        HyperbolicParaboloid: new HyperbolicParaboloid(),
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