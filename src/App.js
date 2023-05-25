import React from "react";
import Header from './components/header/header'

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {showComponent: 'Graph3D'};
      this.menu = new Menu({
          id: 'menu',
          parent: this.id,
          template: template.Menu,
          callbacks: {
              showMenuItem: (name) => this.showMenuItem(name)
          }
      });
      this.componentList = [
          new Graph3D({ id: 'Graph3D', parent: this.id, template: template.Graph3D }),
          new Calculator({ id: 'Calculator', parent: this.id, template: template.Calculator}),
          // new Polynomial({ id: 'Polynomial', parent: this.id, template: template.Polynomial})
      ];
  }
  showMenuItem(name) {
      this.componentList.forEach(comp => comp.hide());
      this.componentList.find(comp => comp.id === name).show();
  }
  showComponent(name) {
    this.setState({showComponent: name});
  }
  render() {
    return(<div className = 'App'>
      <Header showComponent = {name => this.showComponent(name)} />
      {this.state.showComponent === 'Calculator' ?
        <Calculator/>:
      this.state.showComponent === 'Graph2D' ?
        <Graph2D/>:
      this.state.showComponent === 'Graph3D' ?
        <Graph3D/>:<></>}</div>);
  }
}