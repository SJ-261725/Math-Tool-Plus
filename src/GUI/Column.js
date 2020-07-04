import React, { Component } from 'react'

class ColItem extends Component {
	render() {
		return (
			<div className='item' onClick={this.props.func}>
				{this.props.children}
			</div>
		)
	}
}
class ItemNav extends Component {
	render() {
		return (
			<div className='item-nav'>
				{this.props.children}
				<div className='hidden-layer'>
					{this.props.childrenItems.map((item, idx) => {
						return (
							<ColItem func={item.func} key={idx}>
								{item.text}
							</ColItem>
						)
					})}
				</div>
			</div>
		)
	}
}
export default class Column extends Component {
	render() {
		return (
			<div id={this.props.id} className='col'>
				<div className='col-title'>{this.props.children}</div>
				<div className='col-items'>
					{this.props.items.map((item, idx) => {
						if (item.isNav) {
							return (
								<ItemNav childrenItems={item.childrenItems} key={idx}>
									{item.text}
								</ItemNav>
							)
						}
						return (
							<ColItem func={item.func} key={idx}>
								{item.text}
							</ColItem>
						)
					})}
				</div>
			</div>
		)
	}
}
