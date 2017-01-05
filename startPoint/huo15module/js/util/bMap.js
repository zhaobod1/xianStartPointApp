//火一五科技有限公司

/**
 * 获取当前位置
 */
function getPosition() {
	if(!mui) {
		alert('mui obj is not defined!');
		return false;
	}
	if(!map) {
		alert('map obj is not defined!');
		return false;
	}
	var mPoint = map.getCenter();
	
	var lat = mPoint.lat; //获取到当前位置的纬度；			
	var longt = mPoint.lng; //获取到当前位置的经度
	var url = "http://api.map.baidu.com/geocoder/v2/?ak=FC9c13967bf240823ed03d702d883e83&location=" + lat + "," + longt + "&output=json&pois=1"
	mui.getJSON(url, function(rsp) {
		if(rsp != null) {
			console.log(JSON.stringify(rsp));
			var addComp = rsp.result.addressComponent;
			var currentStreet = addComp.district + addComp.street;
			var currentPosition = rsp.result.sematic_description;
			console.log(currentPosition);
			currPoint = rsp.result.location;
			if(currentPosition != "") {
				document.getElementById("map_result").innerHTML = "<lable style='color: darkgreen;font-weight: 900;'>我从</lable> " + currentStreet + "<br/>" + currentPosition + " <lable style='color: darkgreen;font-weight: 900;'>上车</lable>";
				plus.storage.setItem("start_postion", currentStreet + currentPosition + "&" + mPoint.lat + "&" + mPoint.lng);
			} else {
				document.getElementById("map_result").innerHTML = "<lable style='color: darkgreen;font-weight: 900;'>我从</lable> " + currentStreet + " <lable style='color: darkgreen;font-weight: 900;'>上车</lable>";
				plus.storage.setItem("start_postion", currentStreet + "&" + mPoint.lat + "&" + mPoint.lng);
				
			}
			
		}
	});
}

/*初始化地图时时定位信息*/
function geoInf(position) {
	if(!mui) {
		alert('mui obj is not defined!');
		return false;
	}
	if(!map) {
		alert('map obj is not defined!');
		return false;
	}
	var codns = position.coords; //获取地理坐标信息；
	var lat = codns.latitude; //获取到当前位置的纬度；			
	var longt = codns.longitude; //获取到当前位置的经度
	var url = "http://api.map.baidu.com/geocoder/v2/?ak=FC9c13967bf240823ed03d702d883e83&location=" + lat + "," + longt + "&output=json&pois=1"
	mui.getJSON(url, function(rsp) {
		if(rsp != null) {
			console.log("geoInf-->mui.getJSON:" + JSON.stringify(rsp));
			var addComp = rsp.result.addressComponent;
			var currentStreet = addComp.district + addComp.street;
			var currentPosition = rsp.result.sematic_description;
			var mPoint = new BMap.Point(longt, lat);
			currPoint = mPoint;//huo15 当前位置
			if(currentPosition != "") {
				document.getElementById("map_result").innerHTML = "<lable style='color: darkgreen;font-weight: 900;'>我从</lable> " + currentStreet + "<br/>" + currentPosition + " <lable style='color: darkgreen;font-weight: 900;'>上车</lable>";
				plus.storage.setItem("start_postion", currentStreet + currentPosition + "&" + mPoint.lat + "&" + mPoint.lng);
			} else {
				document.getElementById("map_result").innerHTML = "<lable style='color: darkgreen;font-weight: 900;'>我从</lable> " + currentStreet + " <lable style='color: darkgreen;font-weight: 900;'>上车</lable>";
				plus.storage.setItem("start_postion", currentStreet + "&" + mPoint.lat + "&" + mPoint.lng);
			}
			if(storeMarker == null) {

				storeMarker = new BMap.Marker(storePoint);
				map.addOverlay(storeMarker);

			}

			map.centerAndZoom(mPoint, 15);
		}
	});
}

// 通过百度定位模块获取位置信息
function getPosBaidu() {
	plus.geolocation.getCurrentPosition(geoInf, function(e) {
		console.log("info----" + e.message);
	}, {
		provider: 'baidu'
	});
}