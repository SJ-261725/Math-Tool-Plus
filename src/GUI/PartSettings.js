import React, { Component } from 'react'
import drawApi from '../js/draw'
const { DrawFunction, drawFunc } = drawApi
const map = {
	'1': '一次函数',
	'2': '二次函数',
	'-1': '反比例函数',
	'-2': '三角函数 sin',
	'-3': '三角函数 cos',
}
function toDraw(type, name, params, color, width) {
	drawFunc(new DrawFunction(name, params.map(str=>+str), type, { width, color }))
	window.partSettings.setState({ name: '', params: ['', '', ''], color: '#61dafb', width: 2 })
	window.stateField.update()
	close()
}
function close() {
	window.partSettings.setState({ show: false })
}

function makeParamInput(order) {
	return (
		<input
			type='text'
			value={window.partSettings.state.params[order]}
			onChange={e => {
				const editParam = e.target.value
				window.partSettings.setState(pre => {
					const tmp = pre.params
					tmp[order] = editParam
					return { params: tmp }
				})
			}}
		/>
	)
}
function funcInput(type) {
	switch (type) {
		case 1:
			return (
				<div className="main-input">
					y = {makeParamInput(0)}x + {makeParamInput(1)}
				</div>
			)
		case 2:
			return (
				<div className="main-input">
					y = {makeParamInput(0)}x<sup>2</sup> + {makeParamInput(1)}x + {makeParamInput(2)}
				</div>
			)
		case -1:
			return <div className="main-input">y = {makeParamInput(0)}/x</div>
		case -2:
			return <div className="main-input">y = sin( {makeParamInput(0)}x )</div>
		case -3:
			return <div className="main-input">y = cos( {makeParamInput(0)}x )</div>
		default:
			break
	}
}
function TopBar() {
	return (
		<div className='top-bar'>
			<div className='close' onClick={close}>
				X
			</div>
		</div>
	)
}
function BottomBtns(props) {
	return (
		<div className='bottom'>
			<div onClick={toDraw.bind(this, ...props.getInfo())}>确定</div>
			<div onClick={close}>取消</div>
		</div>
	)
}
class FuncSettings extends Component {
	render() {
		return (
			<div className='func-settings'>
				<div className='basic-attr'>
					{map[this.props.type]} :{' '}
					<input
						type='text'
						id='name'
						title='函数命名'
						value={window.partSettings.state.name}
						onChange={e => window.partSettings.setState({ name: e.target.value })}
					/>
					<div className='right'>
						<input
							type='color'
							title='函数线条颜色'
							value={window.partSettings.state.color}
							onChange={e => window.partSettings.setState({ color: e.target.value })}
						/>
						<input
							type='number'
							title='函数线条粗细'
							value={window.partSettings.state.width}
							onChange={e => window.partSettings.setState({ width: e.target.value })}
						/>
					</div>
				</div>
				{funcInput(this.props.type)}
			</div>
		)
	}
}

class GraphSettings extends Component {
	render() {
		return <div className='graph-settings'></div>
	}
}

export default class PartSettings extends Component {
	state = {
		show: false,
		type: 'func',
		detailedType: 1,
		name: '',
		params: ['', '', ''],
		color: '#61dafb',
		width: 2,
	}
	getInfo = () => {
		return [this.state.detailedType, this.state.name, this.state.params, this.state.color, this.state.width]
	}
	render() {
		window.partSettings = this
		return (
			<div
				className='part-settings'
				style={{ width: this.state.show ? null : '0', border: this.state.show ? null : 'none' }}
			>
				<TopBar />
				{this.state.type === 'func' ? <FuncSettings type={this.state.detailedType} /> : <GraphSettings />}
				<BottomBtns getInfo={this.getInfo} />
			</div>
		)
	}
}
