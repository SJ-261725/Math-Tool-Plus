import React from "react";
import logo from "../logo.svg";
import "../css/Nav.css";
import Column from "./Column"
import {globalTools,funcTools,graphTools,advancedTools} from "../js/gui"

function Nav() {
	return (
		<React.StrictMode>
			<Column id='open' items={globalTools}><img src={logo}></img>MTPP</Column>
			<div id='select-bar'>
				<Column items={funcTools}>函数</Column>
				<Column items={graphTools}>图形</Column>
				<Column items={advancedTools}>高级</Column>
			</div>
  		</React.StrictMode>
	);
}
export default Nav;
