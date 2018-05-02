// JavaScript Document
var ____configArray;
function __initDropDownList(configArray){
	//获取Select菜单
	____configArray=configArray;
	var existArray=configArray.split("|");
	for(var i=0;i<existArray.length;i++){
		if(existArray[i].length<1){return;}
		//根据参数分别获取div，并分别添加事件
		var parentContainer=document.getElementById(existArray[i]);
		if(!parentContainer){return;}
		//获取下面的select，且获取其中的option
		var selectObj=parentContainer.getElementsByTagName("select");
		if(selectObj.length<1){return;}
		var optionArray=selectObj[0].getElementsByTagName("option");
		//获取option，并分别添加到各个li
		var optionLength=optionArray.length;
		for(var j=0;j<optionLength;j++){
			//获取ul，以便能够添加项目
			var ulObj=parentContainer.getElementsByTagName("ul");
			if(ulObj.length<1){return;}
			//获取span，以便能显示当前选择的项目
			var spanObj=parentContainer.getElementsByTagName("span");
			if(spanObj.length<1){return;}
			var liObj=document.createElement("li");
			var textNode=document.createTextNode(optionArray[j].firstChild.nodeValue)
			liObj.appendChild(textNode);
			liObj.setAttribute("currentIndex",j);
			//如果option的selected="selected"
			if (optionArray[j].selected){
				selectCurrentItem(ulObj[0],liObj);
			}
			//给每个liObj添加事件
			liObj.onclick=function(){
				selectCurrentItem(this.parentNode,this);
			}
			liObj.onmouseover=function(){if(this.className.indexOf("current")<0){this.className="over";}}
			liObj.onmouseout=function(){if(this.className.indexOf("current")<0){this.className="normal";}}
			ulObj[0].appendChild(liObj);
			spanObj[0].onclick=function(event){
				//如果当前是显示的，就隐藏，反之亦然
				showHiddenUl(this);
			}
			spanObj[0].onmouseover=function(){this.className='over';}
			spanObj[0].onmouseout=function(){this.className="";};
			ulObj[0].onclick=function(){this.className="";}
		}
		parentContainer.onclick=function(event){
			if(!event){event=window.event;}
				event.cancelBubble=true;
				var eventUlObj=this.getElementsByTagName("ul")[0];
				bodyClickHiddenUl(eventUlObj);
		}
	}
}
function selectCurrentItem(ulObj,currentObj){
	var parentObj=ulObj.parentNode;
	var spanObj=parentObj.getElementsByTagName("span")[0];
	spanObj.firstChild.nodeValue=currentObj.firstChild.nodeValue;
	var selectObj=parentObj.getElementsByTagName("select")[0];
	selectObj.selectedIndex=parseInt(currentObj.getAttribute("currentIndex"));
	var ulLiObj=ulObj.getElementsByTagName("li");
	var length=ulLiObj.length;
	var currentLiObj=null;
	for(var i=0;i<length;i++){
		currentLiObj=ulLiObj[i];
		currentLiObj.className="normal";
	}
	currentObj.className="current";
}
function showHiddenUl(currentObj){
	var parentNode=currentObj.parentNode;
	var ulObj=parentNode.getElementsByTagName("ul")[0];
	if(ulObj.className==""){
		ulObj.className="show";
	}else{
		ulObj.className="";
	}
}
//点击body区域（非“下拉菜单”）隐藏菜单
function addBodyClick(func) {
	var bodyObj=document.getElementsByTagName("body")[0];
	var oldBodyClick = bodyObj.onclick;
		if (typeof bodyObj.onclick != 'function') {
			bodyObj.onclick = func;
		} else {
			bodyObj.onclick = function() {
			oldBodyClick();
			func();
		}
	}
}
//隐藏所有的UL
function bodyClickHiddenUl(eventUlObj){
	var existArray=____configArray.split("|");
	for(var i=0;i<existArray.length;i++){
		if(existArray[i].length<1){return;}
		//寻找所有UL并且隐藏
		var parentContainer=document.getElementById(existArray[i]);
		if(!parentContainer){return;}
		var ulObj=parentContainer.getElementsByTagName("ul");
		if(eventUlObj!=ulObj[0]){
			ulObj[0].className="";
		}
	}
}
var __dropDownList="dropDownList1|dropDownList2|dropDownList3";
__initDropDownList(__dropDownList);
//添加这个可以确保点击body区域的时候 也可以隐藏菜单
addBodyClick(bodyClickHiddenUl);
