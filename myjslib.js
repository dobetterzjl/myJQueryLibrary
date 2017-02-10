
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