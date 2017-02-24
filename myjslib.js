
function attr(elem,name,value){
	if(!name||name.constructor!=String){
	return '';
	}
	name={'for':'htmlFor','class':'className'}[name]||name;
	if(!value){
		return elem[name]||elem.getAttribute(name)||'';
	}else{
		elem[name]=value;
		if(elem.setAttribute){
		elem.setAttribute(name,value);
	}
	}
}
function val(elem,valu){
	if(valu!=null){
		elem.value=valu;
	}
	else{
		return elem.value;
	}
}
function getStyle(elem,prop){
	if(elem.currentStyle){//ie
		return elem.currentStyle[prop];
	}
	else{
		return getComputedStyle(elem,null)[prop];
	}
}
function setStyle(elem,attr,value){
	switch(attr){
		case 'width':
		case 'height':
		case 'padding':
		case 'paddingLeft':
		case 'paddingRight':
		case 'paddingTop':
		case 'paddingBottom':
	 value=/\%/.test(attr)?value:parseInt(Math.max(value,0))+'px';
		break;
		case 'top':
		case 'left':
		case 'right':
		case 'bottom':
		case 'margin':
		case 'marginLeft':
		case 'marginRight':
		case 'marginTop':
		case 'marginBottom':
	 value=/\%/.test(value)?value:parseInt(value)+'px';
		break;
	}
}
function css(elem,attr,value){
	if(value){
		setStyle(elem,attr,value);
	}else{
		if(typeof attr =="string"){
			return getStyle(elem,attr);
		}else{
			var obj=attr;
			for (var p in obj){
				setStyle(elem,p,obj[p]);
			}
		}
	}
}
function addClass(elem,className){
	var re = new RegExp('\\b'+className +'\\b','g');
	if(!re.test(elem.className)){
		elem.className+=""+className;
	}
}
function trim(str){
	return str.replace(/^\s+|\s+$/g,"");
}
function removeClass(elem,className){
	var re = new RegExp('\\b'+className+'\\b','g');
	if(re.test(elem.className)){
		elem.className=trim(elem.className.replace(re,""));
	} 
}
function getWidth(elem){
		return parseInt(getStyle(elem,'width'));
}
function getHeight(elem){
		return parseInt(getStyle(elem,'height'));
}
function WindowWidth(){
	var de= document.documentElement;
	return self.innerWidth//标准浏览器
	||(de && de.clientWidth)
	|| document.body.clientWidth;
}
function WindowHeight(){
	var de=document.documentElement;
	return self.innerHeight|| (de&&de.clientHeight)||document.body.clientHeight;
} 
function pageWidth(){
	return document.body.scrollWidth;
}
function pageHeight(){
	return document.body.scrollHeight;
}
function resetCss(elem,prop){
	var old={};
	for(var i in prop){
		old[i]=elem.style[i];
		elem.style[i]=prop[i];
	}
	return old;
}
function restoreCss(elem,prop){
	for(var i in prop){
		elem.style[i]=prop[i];
	}
}
function fullHeight(elem){
	if (getStyle(elem,'display')!='none') {
		return elem.offsetHeight||getHeight(elem);
	}else{
		var old=resetCss(elem,{
			display:"block",
			visilibility:"hidden",
			position:"absolute"
		});
		var h=elem.clientHeight||getHeight(elem);
		restoreCss(elem,old);
		return h;
	}
}
function fullWidth(elem){
	if (getStyle(elem,'display')!='none') {
		return elem.offsetWidth||getWidth(elem);
	}else{
		var old=resetCss(elem,{
			display:'block',
			visilibility:'hidden',
			position:'absolute'
		});
		var w = elem.clientWidth||getWidth(elem);
		restoreCss(elem,old);
		return w;
	}
}
// 相对于浏览器取到X值
function pageX(elem){
	var p=0;
	while(elem.offsetParent){
		//offsetParent:
		p += elem.offsetLeft;
		elem= elem.offsetParent;
	}
	return p;
}
//相对于浏览器取到Y值
function pageY(elem){
	var p =0;
	while(elem.offsetParent){//offsetParent:返回已经定位父元素，如果没有返回html
		p += elem.offsetTop;
		elem = elem.offsetParent;
	}
	return p;
}
//取到本身的left值
function posX(elem){
	return parseInt(getStyle(elem,"left"));
}
//取到本身的top值
function posY(elem){
	return parseInt(getStyle(elem,"top"));
}
//取到相对于父元素的距离
function parentX(elem){
	return elem.parentNode==elem.offsetParent
	?elem.offsetLeft
	:pageX(elem)-pageX(elem.parentNode);
}
function parentY(elem){
	return elem.parentNode==elem.offsetParent
	?elem.offsetTop
	:pageY(elem)-pageY(elem.parentNode);
}
//取到鼠标点击位置距页面值
function getX(e){
	e=e||window.event;
	return e.pageX||e.clientX + document.body.scrollLeft||0;
	//pageX取到鼠标点击位置距页面值，e.clientX 距离浏览器位置，
	//document.body.scrollLeft 滚动条滚出左边距离
}
function getY(e){
	e=e||window.event;
	return e.pageY||e.clientY + document.body.scrollTop||0;
}
function addX(elem,pos){
	setX(posX(elem) + pos); 
}
function addY(elem,pos){
	setX(posY(elem) + pos); 
}
//滚动条滚出页面距离
function scrollX(){
	var de = document.documentElement;
	return self.pageXOffset||(de && de.scrollLeft)||document.body.scrollLeft;
}
function scrollY(){
	var de = document.documentElement;
	return self.pageYOffset||(de && de.scrollTop)||document.body.scrollTop;
}
//相对于目标元距离
function getElementX(elem){
	return elem.layerX || window.event.offsetX;
}
function getElementY(elem){
	return elem.layerY || window.event.offsetY;
}
function remove(elem){
	elem.parentNode.removeChild(elem);
}
function empty(elem){
	elem.innerHTML="";
}
function text(elem){
	var t="";
	elem=elem.childNodes||elem;
	for(var i=0;i<elem.length;i++){
		t+= elem[i].nodeType!=1?elem.nodeValue:text(elem[j].childNodes);
	}
	return t;
}
//调用 ajax({
// 	method:'post',
// 	url:""
// 	data:{ 
// 		name:'aa',
// 		age:34
// 	},
	// callback:function(data){

	// }
// 	dataType:'text'

// });
function ajax(proem){
//创建xhr对象
	var xmlHttp;
	if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	}else{
		xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	}
//发送请求
	for( var p in proem){
		var dataStr += p+"="+proem.data[p] +"&";
	}
	dataStr = dataStr.subString(0,dataStr.length-1);
	if(proem.method=='GET'){
	xmlHttp.open(proem.method,proem.url+"?"+dataStr,true);
	xmlHttp.send();
	}else{
		xmlHttp.open(proem.method,proem.url,true);
		xmlHttp.setRequestHeader("Content-Type",application/x-www-form-urlencoded);
		xmlHttp.send(dataStr);
	}
	xmlHttp.onreadystatechange=function(){
		if (xmlHttp.readyState ==4 && xmlHttp.status==200) {
			var callbackValue = xmlHttp.responseText;
			if (callbackValue=="json") {
				callbackValue=JSON.prase(callbackValue)
			}
			proem.callback&& proem.callback(callbackValue);
		}
	};
}
	function isArray(arg){
		return typeof arg ==="object" &&
		 Object.prototype.toString.call(arg) ==="[object Array]";
	}
