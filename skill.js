//禁止右键点击
$(document).ready(function(){
	$(document).bind("contextmenu",function(e){//$(document).bind('contextmenu',function(){})是绑定右键菜单事件
		return false;
	});
});
//获得鼠标指针XY值
$(function(){
	$().mouseover(function(e){
		//在ID值为Xy元素中显示x,y坐标
		$('#Xy').html("X:"+e.pageX+"Y:"+e.pageY)
	})
});
//返回顶部按钮
$(function(){
	$('.menu').on('click',function(){
		$(document.body).animate({
			scrollTop:0
		},800);
		return false;
	});
});
//检查图片是否加载完成
$('img').load(function(){
	console.log('success');//加载成功后做的事
});
//
