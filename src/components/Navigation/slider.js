import React from 'react';
import InputRange from "react-input-range";

import 'react-input-range/lib/css/index.css';
import "./slider.css";

export default class Slider extends React.Component{
	constructor(props){
		super(props);
		this.onSliderChange = this.onSliderChange.bind(this);
	}
	

	onSliderChange(value){
		const changedData = {
			type: this.props.data.label,
			value
		}
		this.props.onSliderChange(changedData);
	}
	render(){
		const{min,max, value,label,step} = this.props.data;
		return(
			<div className="slider">
				<label>{this.props.children}</label>
				<InputRange
					minValue={min}
					maxValue={max}
					step={step}
					onChange={value => this.onSliderChange(value)}
					value={value}
				/>
			</div>
		);
	}
}