import React, { Component } from 'react'
import { drawList, removeObj } from '../js/draw'
import { partSettings } from './PartSettings'

let stateField
class EachFuncObj extends Component {
	editPainting = () => {
		partSettings.setState({
			show: true,
			type: 'func',
			detailedType: this.props.type,
			name: this.props.name,
			params: this.props.params,
			color: this.props.style.color,
			width: this.props.style.width,
			edit: this.props.controlObj,
		})
	}
	removeThis = () => {
		removeObj(this.props.controlObj)
		this.props.update()
	}
	render() {
		return (
			<div className='painting-obj'>
				<div>
					<div className='colorSquare' style={{ backgroundColor: this.props.style.color }}></div>
					<div>{this.props.name}</div>
				</div>
				<div>
					<span className='edit' onClick={this.editPainting}>
						📝
					</span>
					<span className='edit' onClick={this.removeThis}>
						🗑️
					</span>
				</div>
			</div>
		)
	}
}
export default class StateField extends Component {
	state = {
		list: drawList,
	}
	update = () => {
		this.setState({ list: drawList })
	}
	render() {
		stateField = this
		return (
			<React.StrictMode>
				<>
				<div className='take-color-field'></div>
				<div className='change-width-field'></div>
				<div className='painting-obj-field'>
					{this.state.list.map((obj, idx) => (
						<EachFuncObj {...obj} controlObj={obj} key={idx} update={this.update} />
					))}
				</div>
				</>
			</React.StrictMode>
		)
	}
}
export { stateField }
