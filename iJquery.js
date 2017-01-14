function IJquery(arg){
	this.elements=[];
	switch(typeof(arg)){
		case "string":
		var prefix = arg.charAt(0);
		switch(prefix){
			case "#":
				var domObj=document.getElementById(arg.substring(1));
				if(domObj){
					this.elements.push(domObj);
				}

			break;
			case ".":
				this.elements=document.getElementsByClassName(arg.substring(1));
			break;
			default:
				this.elements=document.getElementsByTagName(arg);
			break;

		}

		break;
		case "object":
			this.elements.push(arg);
		break;
		case "function":
			window.addEventListener('load',arg,false);
		break;
}
}
IJquery.prototype.click=function(fn){
		for(var i=0;i<this.elements.length;i++){
				this.elements[i].addEventListener('click',fn,false);
			}
			return this;
		};
IJquery.prototype.mouseover=function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].addEventListener('mouseover',fn,false);
	}
	return this;
}
IJquery.prototype.on=function(type,selector,fn){
	if(selector && typeof selector=='string'){//进行事件委托（代理）
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].addEventListener(type,function(e){
				var prefix=selector.charAt(0);
				switch(prefix){
					case'#':
					if(e.target.id==selector.substring(1)){
						fn.call(e.target);
					}
					break;
					case'.':
						if(e.target.className==selector.substring(1)){
							fn.call(e.target);
						}
					break;
					default:
					break;
				}
			},false)
		}

	} else if(selector && typeof selector=='function'){
				 fn = selector;
	for(var i=0; i<this.elements.length;i++){
		this.elements[i].addEventListener('type',fn,false);
	}
	}
	return this;
}
function getStyle(elem,prop){
	if (elem.currentStyle) {//IE
		return elem.currentStyle[prop];
	}else{
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
IJquery.prototype.css=function(propertyname,value){
	if(value){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].style[propertyname]=value;
		}
	else{
			if (typeof propertyname=='string') {
				return getStyle(this.elements[0],propertyname);
			}else{
				for(var p as propertyname){
					for(var i=0;i<this.elements.length;i++){
						// this.elements[i].style[p]=propertyname[p];
						setStyle(this.elements[i],p,propertyname[p]);
					}
				}
			}
		}
	}
	
}
function $(arg){
	return new IJquery(arg);
	}