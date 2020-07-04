import React, { Component } from 'react'

export default class ColItem extends Component {
    render() {
        return (
            <div className="item" onClick={this.props.func}>
                {this.props.children}
            </div>
        )
    }
}
