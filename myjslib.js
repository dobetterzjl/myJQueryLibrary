
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