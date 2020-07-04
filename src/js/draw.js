/** @type {HTMLCanvasElement}*/
const settings = {
	/**
	 * width : 坐标系的长
	 * height : 坐标系的宽
	 * cols : 坐标系的列的数目(除去xOy)
	 * rows : 坐标系的行的数目(除去xOy)
	 * O : 坐标系的原点
	 */
	// width: Math.floor(window.screen.width/80*0.75)*80,
	width: 1200,
	// height: Math.floor(window.screen.height/80*0.9)*80,
	height: 720,
	// unit: Math.floor((window.screen.width / 80) * 0.25) * 8,
	unit: 40,
	accuracy: 0.5,
	set cols(num) {
		this.unit = this.width / num // 一旦改动cols，就会改变unit，不变长（还可以有另一种方式：只改长，不变unit）
	},
	set rows(num) {
		this.unit = this.height / num
	},
	get cols() {
		return this.width / this.unit
	},
	get rows() {
		return this.height / this.unit
	},
	// 这样解构赋值后不能自动更新（每次是不一样的对象）
	// get O() {
	// 	return {
	// 		x: (this.cols / 2) * this.unit,
	// 		y: (this.rows / 2) * this.unit,
	// 	}
	// },
	O: {
		get x() {
			return Math.floor(settings.cols / 2) * settings.unit
		},
		get y() {
			return Math.floor(settings.rows / 2) * settings.unit
		},
	},
}
const drawList = [] // 所有绘制对象
const basic = document.querySelector('#basic').getContext('2d') // 坐标轴所处画布
const funcField = document.querySelector('#funcField').getContext('2d') // 函数,图形所处画布
// 调整宽度
basic.canvas.width = settings.width
basic.canvas.height = settings.height
funcField.canvas.width = settings.width
funcField.canvas.height = settings.height
// 设置初始线宽
funcField.lineWidth = 2
// 解构出原点方便使用
const { O } = settings
// 最终转化的一系列帮助函数 turn 由可读点转化为canvas坐标,back 相反
function turnX(num) {
	return O.x + num * settings.unit
}
function backX(num) {
	return (num - O.x) / settings.unit
}
function turnY(num) {
	return O.y - num * settings.unit
}
function backY(num) {
	return (O.y - num) / settings.unit
}
// 函数绘制对象的构造函数
class DrawFunction {
	constructor(name, params, type, style) {
		this.name = name
		this.params = params
		this.type = type
		this.style = style
		drawList.push(this)
		// console.log(drawList);
	}
	drawFunc() {
		/**
		 * type:
		 * 	1: 一次函数
		 * 	2: 二次函数
		 * 	-1: 反比例函数一般式
		 * 	-2: 三角函数cos
		 * 	-3: 三角函数sin
		 * 	-4: 二次函数顶点式
		 */
		const { params, type, style } = this
		const { width, color } = style
		const xMax = settings.cols / 2
		const xMin = -settings.cols / 2
		funcField.beginPath()
		funcField.lineWidth = width
		funcField.strokeStyle = color
		switch (type) {
			case 1: {
				const yMin = params[0] * xMin + params[1]
				const yMax = params[0] * xMax + params[1]
				funcField.moveTo(turnX(xMin), turnY(yMin))
				funcField.lineTo(turnX(xMax), turnY(yMax))
				break
			}
			case -1: {
				const yMin = params[0] / xMin
				funcField.moveTo(turnX(xMin), turnY(yMin))
				for (let x = turnX(xMin); x < O.x; x += settings.accuracy) {
					const y = params[0] / backX(x)
					funcField.lineTo(x, turnY(y))
				}
				funcField.moveTo(O.x + settings.accuracy, turnY(params[0] / backX(O.x + settings.accuracy)))
				for (let x = O.x + settings.accuracy; x <= turnX(xMax); x += settings.accuracy) {
					const y = params[0] / backX(x)
					funcField.lineTo(x, turnY(y))
				}
				break
			}
			case -2:
			case -3: {
				const map = {
					'-2': 'sin',
					'-3': 'cos',
				}
				const fx = Math[map[type]]
				const yMin = fx(params[0] * xMin)
				funcField.moveTo(turnX(xMin), turnY(yMin))
				for (let x = turnX(xMin); x <= turnX(xMax); x += settings.accuracy) {
					const y = fx(backX(x) * params[0])
					funcField.lineTo(x, turnY(y))
				}
				break
			}
			case -4: {
				const yMin = params[0] * (xMin - params[1]) ** 2 + params[2]
				funcField.moveTo(turnX(xMin), turnY(yMin))
				for (let x = turnX(xMin); x <= turnX(xMax); x += settings.accuracy) {
					const y = params[0] * (backX(x) - params[1]) ** 2 + params[2]
					funcField.lineTo(x, turnY(y))
				}
				break
			}
			default: {
				const yMin = params[0] * xMin ** type + params[1] * xMin + params[2]
				funcField.moveTo(turnX(xMin), turnY(yMin))
				for (let x = turnX(xMin); x <= turnX(xMax); x += settings.accuracy) {
					const y = params[0] * backX(x) ** type + params[1] * backX(x) + params[2]
					funcField.lineTo(x, turnY(y))
				}
				break
			}
		}
		funcField.stroke()
	}
}
// 绘制坐标系
function xOy() {
	basic.fillStyle = '#fff'
	basic.lineWidth = 2
	basic.font = `${settings.unit / 3}px monocase`
	basic.clearRect(0, 0, settings.width, settings.height)
	// 绘制坐标轴以外的线和线边数字
	basic.strokeStyle = '#aaa'
	for (let i = 0; i < settings.cols + 1; i++) {
		if (i === Math.floor(settings.cols / 2)) continue
		basic.moveTo(i * settings.unit, 0)
		basic.lineTo(i * settings.unit, settings.height)
		basic.fillText(i - Math.floor(settings.cols / 2), i * settings.unit + settings.unit / 7, O.y + settings.unit / 2)
	}
	for (let i = 0; i < settings.rows + 1; i++) {
		if (i === Math.floor(settings.rows / 2)) continue
		basic.moveTo(0, i * settings.unit)
		basic.lineTo(settings.width, i * settings.unit)
		basic.fillText(-i + Math.floor(settings.rows / 2), O.x + settings.unit / 7, i * settings.unit + settings.unit / 2)
	}
	basic.stroke()
	// 绘制坐标轴
	basic.beginPath()
	basic.strokeStyle = '#fff'
	// 绘制原点
	basic.arc(O.x, O.y, 3, 0, 180 * Math.PI)
	basic.fill()
	basic.fillText('0', O.x + settings.unit / 7, O.y + settings.unit / 2)
	// 绘制坐标轴的线条
	basic.moveTo(0, O.y)
	basic.lineTo(settings.width, O.y)
	basic.moveTo(O.x, 0)
	basic.lineTo(O.x, settings.height)
	// 绘制箭头
	// 向上箭头
	basic.moveTo(O.x, 0)
	basic.lineTo(O.x - 0.2 * settings.unit, 0 + 0.2 * settings.unit)
	basic.moveTo(O.x, 0)
	basic.lineTo(O.x + 0.2 * settings.unit, 0 + 0.2 * settings.unit)
	// 向右箭头
	basic.moveTo(settings.width, O.y)
	basic.lineTo(settings.width - 0.2 * settings.unit, O.y - 0.2 * settings.unit)
	basic.moveTo(settings.width, O.y)
	basic.lineTo(settings.width - 0.2 * settings.unit, O.y + 0.2 * settings.unit)
	basic.stroke()
	// x y的字体
	basic.fillText('x', settings.width - settings.unit * 0.45, O.y + settings.unit * 0.45)
	basic.fillText('y', O.x - settings.unit * 0.45, settings.unit * 0.45)
}
xOy()

// 重新绘制所有的函数,图形
function reDraw() {
	funcField.clearRect(0, 0, settings.width, settings.height)
	drawList.forEach(obj => obj.drawFunc())
}
// 移除某一个绘制对象
function removeObj(obj) {
	drawList.splice(drawList.indexOf(obj), 1)
	reDraw()
}
// let line1 = new DrawFunction('a', [1, 4, 0], 1, { width: 2, color: '#61dafb' })
// let line2 = new DrawFunction('b', [-2, 0, 0], -1, { width: 3, color: '#61dafb' })
// let line3 = new DrawFunction('a', [-2, 8, 5], 2, { width: 6, color: 'green' })
// let line3 = new DrawFunction('a', [1, 0, 0], -3, { width: 6, color: 'green' })
// let line4 = new DrawFunction('a', [1, 0, 0], 3, { width: 4, color: 'pink' })
// let line4 = new DrawFunction('a', [2, 0, 0], -2, { width: 4, color: 'pink' })
// line1.drawFunc()
// line2.drawFunc()
// line3.drawFunc()
// line4.drawFunc()
function exportImg() {
	basic.drawImage(document.querySelector('#funcField'), 0, 0)
	const data = document.querySelector('#basic').toDataURL('image/png')
	xOy()
	return data
}
window.exportImg = exportImg
export { DrawFunction, drawList, exportImg, reDraw, removeObj }
