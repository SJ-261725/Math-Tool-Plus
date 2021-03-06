/** @type {HTMLCanvasElement}*/
// =======================================================================
// 帮助函数
function getE(str) {
	return document.querySelector(str)
};

function getAE(str) {
	return document.querySelectorAll(str);
}

// function testFixed(num) {
// 	if ((num + "").includes(".")) {
// 		num = (+num).toFixed(fixedNum);
// 	}
// 	return +num;
// }

function testAllow(str) {
	let reg = /^-?[0-9]*\.?[0-9]+$/;
	return reg.test(str);
}
// =======================================================================
// 初始化变量
const basic = getE("#basic").getContext("2d");
const paintField = getE("#paintField").getContext("2d");
// const kitField = getE("#kitField").getContext("2d");
const LENGTH = 800;
// basic.canvas.width = LENGTH;
// basic.canvas.height = LENGTH;
basic.canvas.style.border = "2px solid #fff";
// paintField.canvas.width = LENGTH;
// paintField.canvas.height = LENGTH;
let cols = 20; // 行和列的数目(除去xOy)
let unitLength = LENGTH / cols;
let point = (cols / 2) * (unitLength); // 原点坐标
let x = cols / 2 * unitLength;
// =======================================================================
// =======================================================================
// 功能定义
let painted = false;
basic.lineWidth = "2";
paintField.lineWidth = "2";
// 绘制坐标系
function xOy() {
    basic.font = `${unitLength/3}px monocase`;
	basic.clearRect(0, 0, LENGTH, LENGTH);
	// 绘制坐标轴以外的线
	for (let i = 0; i < cols + 1; i++) {
		if (i == cols / 2) continue;
		basic.strokeStyle = "#ccc";
		basic.moveTo(0, i * unitLength);
		basic.lineTo(LENGTH, i * unitLength);
		basic.moveTo(i * unitLength, 0);
		basic.lineTo(i * unitLength, LENGTH);
		basic.fillText(-i + cols / 2, point + unitLength / 7, i * unitLength + unitLength / 2);
		basic.fillText(i - cols / 2, i * unitLength + unitLength / 7, point + unitLength / 2);
	}
	basic.stroke();
	// 绘制坐标轴
	basic.beginPath();
	basic.strokeStyle = "#fff";
	// 绘制原点
	basic.moveTo(point, point)
	basic.arc(point, point, 3, 0, 180 * Math.PI);
	basic.fill();
	basic.fillText("0", point + unitLength / 7, point + unitLength / 2)
	// 绘制坐标轴的线条
	basic.moveTo(0, point);
	basic.lineTo(LENGTH, point);
	basic.moveTo(point, 0);
	basic.lineTo(point, LENGTH);
	// 绘制箭头
	// 向上箭头
	basic.moveTo(point, 0);
	basic.lineTo(point - 0.2 * unitLength, 0 + 0.2 * unitLength)
	basic.moveTo(point, 0);
	basic.lineTo(point + 0.2 * unitLength, 0 + 0.2 * unitLength)
	// 向右箭头
	basic.moveTo(LENGTH, point);
	basic.lineTo(LENGTH - 0.2 * unitLength, point - 0.2 * unitLength);
	basic.moveTo(LENGTH, point);
	basic.lineTo(LENGTH - 0.2 * unitLength, point + 0.2 * unitLength);
	basic.stroke();
	// x y的字体
	basic.fillText("x", LENGTH - unitLength * 0.45, point + unitLength * 0.45)
	basic.fillText("y", point - unitLength * 0.45, unitLength * 0.45);
}

function paint() {
	paintField.clearRect(0, 0, LENGTH, LENGTH);
	let proParams = getAE(".proportional");
	for (let i = 0; i < proParams.length; i += 2) {
		proportionalFunc(proParams[i].value, proParams[i + 1].value);
	};
	let foParams = getAE(".fo");
	for (let i = 0; i < foParams.length; i += 3) {
		let foInputs = [foParams[i], foParams[i + 2]];
		foFunc(foInputs[0].value, foInputs[1].value, foParams[i + 1].value);
	}
	let quParams = getAE(".qu");
	for (let i = 0; i < quParams.length; i += 4) {
		let quInputs = [quParams[i], quParams[i + 2], quParams[i + 3]];
		quFunc(quInputs[0].value, quInputs[1].value, quInputs[2].value, quParams[i + 1].value);
	}
	let inProParams = getAE(".inPro");
	for (let i = 0; i < inProParams.length; i += 2) {
		inverseProportionalFunc(inProParams[i].value, inProParams[i + 1].value);
	};
	painted = true;
}
// 切换输入框
function toAnother(target) {
	if (target.nodeName == "INPUT" && target.type == "text") {
		let next = target;
		let inputs = Array.from(getE("#leftArea").querySelectorAll("input"));
		let i = (inputs.indexOf(next) + 1) % inputs.length;
		if (inputs[i].type != "text") i = (i + 1) % inputs.length;
		inputs[i].focus();
	}
}
// =======================================================================

// =======================================================================
// 绘制函数的函数
function proportionalFunc(k, c) {
	k = +eval(k);
	paintField.beginPath();
	paintField.strokeStyle = c;
	paintField.moveTo(point + x, point - x * k);
	paintField.lineTo(point - x, point + x * k);
	paintField.stroke();
}

function foFunc(k, b, c) {
	[k, b] = [k, b].map(v => +eval(v));
	paintField.beginPath();
	paintField.strokeStyle = c;
	paintField.moveTo(point + x, point - x * k - unitLength * b);
	paintField.lineTo(point - x, point + x * k - unitLength * b);
	paintField.stroke();
}

function quFunc(a, h, k, c) {
	[a, h, k] = [a, h, k].map(v => +eval(v));
	paintField.beginPath();
	paintField.strokeStyle = c;
	paintField.moveTo(point + -x, point - (a * (-x / unitLength - h) ** 2 + k) * unitLength);
	for (let i = -x + 1; i <= x; i++) {
		paintField.lineTo(point + i, point - (a * (i / unitLength - h) ** 2 + k) * unitLength);
	}
	paintField.stroke();
}

function inverseProportionalFunc(k, c) {
	k = eval(k);
	paintField.beginPath();
	paintField.strokeStyle = c;
	paintField.moveTo(point + 0.1, point - k * unitLength / 0.1 * unitLength);
	for (let i = 0.2; i <= x; i += 0.5) {
		paintField.lineTo(point + i, point - k * unitLength / i * unitLength);
	}
	paintField.moveTo(point + -x, point - k * unitLength / -x * unitLength);
	for (let i = -x + 0.1; i <= 0.1; i += 0.5) {
		paintField.lineTo(point + i, point - k * unitLength / i * unitLength);
	}
	paintField.stroke();
}
// =======================================================================

xOy();