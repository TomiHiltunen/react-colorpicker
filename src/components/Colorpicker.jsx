import React from 'react';

/* HSL/HSV Colorpicker class */

class Colorpicker extends React.Component {

  constructor() {
    super();
    this.state = {
      // Values are randomized for now
      hue: Math.floor(Math.random() * 360) + 0,
      saturation: Math.floor(Math.random() * 100) + 0,
      lightness: Math.floor(Math.random() * 100) + 0
    };
  }

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state)}</pre>
        <HSLSlider manipulate="hue" hsl={this.state} onChange={this._updateHSL.bind(this)} />
        <HSLSlider manipulate="saturation" hsl={this.state} onChange={this._updateHSL.bind(this)} />
        <HSLSlider manipulate="lightness" hsl={this.state} onChange={this._updateHSL.bind(this)} />
        <div style={{
          background: `hsl(${this.state.hue}, ${this.state.saturation}%, ${this.state.lightness}%)`,
          height: "300px",
          borderRadius: "2px"
        }}></div>
      </div>
    );
  }

  _updateHSL(changedHSL) {
    this.setState(changedHSL);
  }

}

/* Colorpicker slider components */

function sliderHandleChange(props, e) {
  let changeObj = {};
  changeObj[props.manipulate] = parseInt(e.target.value);
  props.onChange.call(null, changeObj)
}

function createSliderGradient(props) {
  switch (props.manipulate) {
    case "hue":
      return { background: `linear-gradient(to right, hsl(0, ${props.hsl.saturation}%, ${props.hsl.lightness}%) 0%, hsl(60, ${props.hsl.saturation}%, ${props.hsl.lightness}%) 17%, hsl(120, ${props.hsl.saturation}%, ${props.hsl.lightness}%) 33%, hsl(180, ${props.hsl.saturation}%, ${props.hsl.lightness}%) 50%, hsl(240, ${props.hsl.saturation}%, ${props.hsl.lightness}%) 67%, hsl(300, ${props.hsl.saturation}%, ${props.hsl.lightness}%) 83%, hsl(360, ${props.hsl.saturation}%, ${props.hsl.lightness}%) 100%)` }
    case "saturation":
      return { background: `linear-gradient(to right, hsl(${props.hsl.hue}, 0%, ${props.hsl.lightness}%) 0%, hsl(${props.hsl.hue}, 100%, ${props.hsl.lightness}%) 100%)` }
    case "lightness":
      return { background: `linear-gradient(to right, hsl(${props.hsl.hue}, ${props.hsl.saturation}%, 0%) 0%, hsl(${props.hsl.hue}, ${props.hsl.saturation}%, 50%) 50%, hsl(${props.hsl.hue}, ${props.hsl.saturation}%, 100%) 100%)` }
    default:
      return {}
  }
}

const HSLSlider = (props) => {
  return (
    <div className={"react-colorpicker__slider react-colorpicker__slider--" + props.manipulate}>
      <input
        type="range"
        min="0"
        max={props.manipulate == "hue" ? 360 : 100}
        step="1"
        value={props.hsl[props.manipulate]}
        onChange={sliderHandleChange.bind(this, props)}
        style={createSliderGradient(props)}
      />
    </div>
  );
}

export default Colorpicker
