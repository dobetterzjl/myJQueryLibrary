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
		};
IJquery.prototype.mouseover=function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].addEventListener('mouseover',fn,false);
	}
}
function $(arg){
	return new IJquery(arg);
	}