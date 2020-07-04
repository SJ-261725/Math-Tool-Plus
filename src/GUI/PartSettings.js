import React, { Component } from 'react'
import { DrawFunction, reDraw } from '../js/draw'
import { stateField } from './StateField'
let partSettings
const map = {
	'1': '一次函数',
	'2': '二次一般式',
	'-1': '反比例函数',
	'-2': '三角函数 sin',
	'-3': '三角函数 cos',
	'-4': '二次顶点式',
}
function toDraw(type, name, params, color, width, edit) {
	if (edit) {
		edit.name = name
		edit.params = params
		edit.style = { width, color }
		reDraw()
	} else {
		name = name || map[type]
		new DrawFunction(
			name,
			params.map(str => +str),
			type,
			{ width, color }
		).drawFunc()
	}
	stateField.update()
	close()
}
function close() {
	partSettings.setState({ show: false, name: '', params: ['', '', ''], color: '#61dafb', width: 2, edit: null })
}

function makeParamInput(order) {
	return (
		<input
			type='text'
			value={partSettings.state.params[order]}
			onChange={e => {
				const editParam = e.target.value
				partSettings.setState(pre => {
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
				<div className='main-input'>
					y = {makeParamInput(0)}x + {makeParamInput(1)}
				</div>
			)
		case 2:
			return (
				<div className='main-input'>
					y = {makeParamInput(0)}x<sup>2</sup> + {makeParamInput(1)}x + {makeParamInput(2)}
				</div>
			)
		case -1:
			return <div className='main-input'>y = {makeParamInput(0)}/x</div>
		case -2:
			return <div className='main-input'>y = sin( {makeParamInput(0)}x )</div>
		case -3:
			return <div className='main-input'>y = cos( {makeParamInput(0)}x )</div>
		case -4:
			return (
				<div className='main-input'>
					y = {makeParamInput(0)}(x-{makeParamInput(1)})<sup>2</sup> + {makeParamInput(2)}
				</div>
			)
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
						value={partSettings.state.name}
						onChange={e => partSettings.setState({ name: e.target.value })}
					/>
					<div className='right'>
						<input
							type='color'
							title='函数线条颜色'
							value={partSettings.state.color}
							onChange={e => partSettings.setState({ color: e.target.value })}
						/>
						<input
							type='number'
							title='函数线条粗细'
							value={partSettings.state.width}
							onChange={e => partSettings.setState({ width: e.target.value })}
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
		edit: null,
	}
	getInfo = () => {
		return [
			this.state.detailedType,
			this.state.name,
			this.state.params,
			this.state.color,
			this.state.width,
			this.state.edit,
		]
	}
	render() {
		partSettings = this
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
export { partSettings }
