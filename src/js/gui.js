function openFile(){
	alert("developing...")
}
function setFunc(type){
	window.partSettings.setState({show:true,detailedType:type})
}
function backToOldVersion(){
	window.location.href = "https://sj-261725.github.io/module/MTPP_v2.0.html"
}
export default {
	globalTools: [
		{
			text: '新建',
			func: openFile,
		},
		{
			text: '打开',
			func: openFile,
		},
		{
			text: '导出',
			func: openFile,
		},
		{
			text: '设置',
			func: openFile,
		},
		{
			text: '帮助',
			func: openFile,
		},
		{
			text: '回到旧版',
			func: backToOldVersion,
		},
	],
	funcTools: [
		{
			text: '一次函数',
			func: setFunc.bind(this,1),
		},
		{
			text: '二次函数',
			func: setFunc.bind(this,2),
		},
		{
			text: '反比例函数',
			func: setFunc.bind(this,-1),
		},
		{
			text: '三角函数 sin',
			func: setFunc.bind(this,-2),
		},
		{
			text: '三角函数 cos',
			func: setFunc.bind(this,-3),
		},
	],
	graphTools: [
		{
			text: '平行四边形',
			func: openFile,
		},
		{
			text: '三角形',
			func: openFile,
		},
		{
			text: '圆',
			func: openFile,
		},
		{
			text: '弧',
			func: openFile,
		},
	],
	advancedTools: [
		{
			text: '终端',
			func: openFile,
		},
	],
}
