/**
 * 添加定位点，orientationPoint，map 是全局变量
 * @param {String} lng
 * @param {String} lat
 */
function locationOrientationPoint(lng, lat) {
	console.log('add location point.');
	map.removeOverlay(orientationPoint);
	orientationPoint = new BMap.Point(lng, lat);
	var marker = new BMap.Circle(orientationPoint, 4, {
		strokeColor: '#e92928',
		fillColor: 'red'
	});
	map.addOverlay(marker);
}