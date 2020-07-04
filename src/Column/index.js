import React, { Component } from 'react'
import ColItem from "./ColItem/"

export default class Column extends Component {
    render() {
        return (
            <div id={this.props.id} className="col">
                <div className="col-title">
                    {this.props.children}
                </div>
                <div className="col-items">
                    {this.props.items.map((item,idx)=>{
                        return <ColItem func={item.func} key={idx}>{item.text}</ColItem>
                    })}
                </div>
            </div>
        )
    }
}
