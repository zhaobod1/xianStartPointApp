/**
 * 添加定位点，orientationPoint，map 是全局变量
 * @param {String} lng
 * @param {String} lat
 */
function locationOrientationPoint(lng, lat) {
	map.removeOverlay(orientationPoint);
	orientationPoint = new BMap.Point(lng, lat);
	var marker = new BMap.Circle(orientationPoint, 4, {
		strokeColor: '#e92928',
		fillColor: 'red'
	});
	map.addOverlay(marker);
}
/**
 * 根据车型 返回 车型信息对象,return_result 是全局对象，车型全部信息的数组。
 * @param {Number} carType
 * @return {Object} Table
 */
function carTypeToTable(carType) {
	var Table = null;
	mui.each(return_result.Table, function(index, item) {
		if(item.id == carType) {
			Table = item;
			return;
		}

	});
	return Table;
}

// 初始化套餐信息
function init_packageinfo(table) {
	distance_span.textContent = "￥" + table.car_start_price + "(含" + table.car_meal_away.replace(".00", "") + "公里)+" + table.car_away_price + "/公里" + "+" + table.car_time_price + "/分钟";
	//distance_span.textContent = "套餐包含" + return_result.Table[indx].car_meal_time + "分钟" + return_result.Table[indx].car_meal_away + "公里";
	//cost_span.textContent = "超出按￥" + return_result.Table[indx].car_go_time_price + "/分钟+￥" + return_result.Table[indx].car_go_away_price + "/公里计费";
	cartype_span.textContent = textdecode1(table.car_rem);
}
// 初始化套餐信息 end

//计算超出费用的价格
function far_costmoney(table) {
	var strdistance = parseFloat((parseFloat(str_distance) / 1000).toFixed(3));
	var strcosttime = parseInt(parseInt(str_costtime) / 60);
	var car_start_price = parseFloat(table.car_start_price); //起租价
	var car_meal_away = parseFloat(table.car_meal_away); //起租价包含公里
	var order_away_fee = 0; //里程费
	var order_time_fee = 0; //时长费
	var order_far_away_fee = 0; //远途费 
	var car_far_away = parseFloat(table.car_far_away); //远途标准
	if(strdistance > 0) {
		if(strdistance > car_meal_away) {
			var strdistance1 = strdistance - car_meal_away;
			order_away_fee = strdistance1 * parseFloat(table.car_away_price); //里程*里程价
		} else {
			order_away_fee = car_start_price;
		}
	}

	if(strcosttime > 0) order_time_fee = strcosttime * parseFloat(table.car_time_price); //时长*时长价
	if(strdistance > 0 && strdistance > car_far_away) order_far_away_fee = (strdistance - car_far_away) * parseFloat(table.car_far_price); //（里程-远途标准）*远途价

	var order_fee = car_start_price + order_away_fee + order_time_fee + order_far_away_fee;
	package_price.textContent = "￥" + order_fee.toFixed(2);
}
//计算超出费用的价格 end

/*init_carinfo() 初始化专车信息*/
function init_carinfo(carTable) {
	var tr_carname = document.getElementById("tr_carname"); //车名称表格的行
	var tr_carimg = document.getElementById("tr_carimg"); //车型图片的表格行
	var tr_carRadio = document.getElementById("tr_carRadio"); //车型选择单选按钮表格行
	//车型数量
	var result_len = return_result.Table.length;
	var str_carname = "";
	var str_carimg = "";
	var str_carRadio = "";
	var table = {};
	//循环读取返回结果
	for(var i = result_len - 1; i >= 0; i--) {
		str_carname += "<td><label>" + return_result.Table[i].car_name + "</label></td>"
		str_carimg += "<td><img  width='70px' src='" + request_img_url + return_result.Table[i].car_img + "'/></td>"
		if(return_result.Table[i].id == carTable.id) {
			table = carTable;
			str_carRadio += '<td><div class="mui-input-row mui-radio mui-left"><label>&nbsp;</label><input name="choose_taxi" type="radio" checked="checked" value="' + carTable.id + '" onchange="choose_carType();"></div></td>';

		} else {
			str_carRadio += '<td><div class="mui-input-row mui-radio mui-left"><label>&nbsp;</label><input name="choose_taxi" type="radio" value="' + return_result.Table[i].id + '" onchange="choose_carType();"></div></td>';

		}
	}
	tr_carname.innerHTML = str_carname;
	tr_carimg.innerHTML = str_carimg;
	tr_carRadio.innerHTML = str_carRadio;

	//车型描述
	document.getElementById("cartype_span").textContent = textdecode1(table.car_rem);
	//预估价
	package_price.textContent = "￥" + table.car_start_price;
	//document.getElementById("distance_span").textContent = "套餐包含" + return_result.Table[2].car_meal_time + "分钟" + return_result.Table[2].car_meal_away + "公里";
	//里程预估
	document.getElementById("distance_span").textContent = "￥" + table.car_start_price + "(含" + table.car_meal_away.replace(".00", "") + "公里)+" + table.car_away_price + "/公里" + "+" + return_result.Table[2].car_time_price + "/分钟";
	//document.getElementById("cost_span").textContent = "超出按￥" + return_result.Table[2].car_go_time_price + "/分钟+￥" + return_result.Table[2].car_go_away_price + "/公里计费";
}
/*init_carinfo() 初始化专车信息 end*/