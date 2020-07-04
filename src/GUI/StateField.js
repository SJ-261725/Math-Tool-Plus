import React, { Component } from 'react'
import drawApi from '../js/draw'
const { drawList } = drawApi

class EachFuncObj extends Component {
	render() {
		console.log(this)
		return (
			<div>
				<div>{this.props.name}</div>
			</div>
		)
	}
}
export default class StateField extends Component {
	state = {
		list: drawList,
	}
	update() {
		this.setState({ list: drawList })
	}
	render() {
		window.stateField = this
		return (
			<React.StrictMode>
				<div className='take-color-field'></div>
				<div className='change-weight-field'></div>
				<div className='graph-obj-field'>
					{this.state.list.map((obj,i) => (
						<EachFuncObj {...obj} key={i}/>
					))}
				</div>
			</React.StrictMode>
		)
	}
}
