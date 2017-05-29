var shares=null,bhref=false;
var Intent=null,File=null,Uri=null,main=null;

// H5 plus事件处理
function plusReady(){
	updateSerivces();
	if(plus.os.name=="Android"){
		Intent = plus.android.importClass("android.content.Intent");
		File = plus.android.importClass("java.io.File");
		Uri = plus.android.importClass("android.net.Uri");
		main = plus.android.runtimeMainActivity();
	}
}
if(window.plus){
	plusReady();
}else{
	document.addEventListener("plusready",plusReady,false);
}
/**
 * 更新分享服务
 */
function updateSerivces(){
	plus.share.getServices( function(s){
		shares={};
		for(var i in s){
			var t=s[i];
			shares[t.id]=t;
		}
	}, function(e){
		
		console.log("获取分享服务列表失败："+e.message );
	} );
}
// 打开分享
function shareShow(){
	bhref=true;
	var ids=[{id:"weixin",ex:"WXSceneSession"},{id:"weixin",ex:"WXSceneTimeline"},{id:"sinaweibo"},{id:"tencentweibo"}],
	bts=[{title:"发送给微信好友"},{title:"分享到微信朋友圈"},{title:"分享到新浪微博"},{title:"分享到腾讯微博"}];
//	if(plus.os.name=="iOS"){
//		ids.push({id:"qq"});
//		bts.push({title:"分享到QQ"});
//	}
	plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
		function(e){
			var i=e.index;
			if(i>0){
				shareAction(ids[i-1].id,ids[i-1].ex);
			}
		}
	);
}
/**
   * 分享操作
   * @param {String} id
   */
function shareAction(id,ex) {
	var s=null;
//	outSet( "分享操作：" );
	if(!id||!(s=shares[id])){
		mui.toast( "无效的分享服务！" );
		return;
	}
	if ( s.authenticated ) {
		console.log( "---已授权---" );
		shareMessage(s,ex);
	} else {
		console.log( "---未授权---" );
		s.authorize( function(){
				shareMessage(s,ex);
			},function(e){
				var msgs = e.message.split("http")[0];
			mui.toast( "认证授权失败："+msgs);
		});
	}
}
var sharehref="http://net.huo15.com/down.aspx";
var sharecontent="我正在使用起点出行专车司机端,使用租车服务特别方便，赶紧跟我一起来体验！";
var sharehrefTitle="起点出行专车司机端";
var sharehrefDes="我正在使用起点出行专车司机端,使用租车服务特别方便，赶紧跟我一起来体验！";
/**
   * 发送分享消息
   * @param {plus.share.ShareService} s
   */
function shareMessage(s,ex){
	var msg={content:sharecontent,extra:{scene:ex}};
	if(bhref){
		msg.href=sharehref;
		if(sharehrefTitle!=""){
			msg.title=sharehrefTitle;
		}
		if(sharehrefDes!=""){
			msg.content=sharehrefDes;
		}
		msg.thumbs=["_www/logo.png"];
		msg.pictures=["_www/logo.png"];
	}else{
		if(pic&&pic.realUrl){
			msg.pictures=[pic.realUrl];
		}
	}
	console.log(JSON.stringify(msg));
	s.send( msg, function(){
		mui.toast( "分享到\""+s.description+"\"成功！ " );
	}, function(e){
		var msgs = e.message.split("http")[0];
		mui.toast("分享到\"" + s.description + "\"失败:"+msgs);
	} );
}