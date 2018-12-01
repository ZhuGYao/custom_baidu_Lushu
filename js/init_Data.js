/**
 * 计算总点数
 * @param {Object} points 百度坐标点
 * @param {Object} data   原始数据
 * @return allPoints 坐标数组
 */
function sumPoints(points, data) {
	var allPoints = []
	for(var i = 1; i < points.length; i++) {
		//拿到前后两点的时间
		var start = new Date(data[i - 1]["time"])
		var end = new Date(data[i]["time"])
		//进行相减
		var inteval = end - start;
		//去除以一定倍数,拿到与时间相对应的点数
		var num = inteval / 30000
		//判断前后两点是否是同一点
		if(data[i - 1]["latitude"] == data[i]["latitude"]) {
			allPoints.push(...addCoord(points[i], num));
		} else {
			allPoints.push(...getPoints(points[i - 1], points[i], num));
		}
	}
	return allPoints;
}

/**
 *  获取data数据中的经纬度点并格式化点为BMap点
 */
function getBMapPoints(data) {
	var points = [];
	for(var i = 0; i < data.length; i++) {
		var x = data[i].longitude;
		var y = data[i].latitude;
		points[i] = new BMap.Point(x, y);
	}
	return points;
}

/**
 *获取prvePoint和newPoint之间的num个点
 *@param prvePoint 起点
 *@param newPoint 终点
 *@param num 取两中间的点个数
 *@return points 两点之间的num个点的数组   
 */
function getPoints(prvePoint, newPoint, num) {
	var lat;
	var lng;
	var points = [];
	if(prvePoint.lng > newPoint.lng && prvePoint.lat > newPoint.lat) {
		lat = Math.abs(prvePoint.lat - newPoint.lat) / num;
		lng = Math.abs(prvePoint.lng - newPoint.lng) / num;
		points[0] = prvePoint;
		for(var i = 1; i < num - 1; i++) {
			points[i] = new BMap.Point(prvePoint.lng - lng * (i + 1), prvePoint.lat - lat * (i + 1));
		}
	}
	if(prvePoint.lng > newPoint.lng && prvePoint.lat < newPoint.lat) {
		lat = Math.abs(prvePoint.lat - newPoint.lat) / num;
		lng = Math.abs(prvePoint.lng - newPoint.lng) / num;
		points[0] = prvePoint;
		for(var i = 1; i < num - 1; i++) {
			points[i] = new BMap.Point(prvePoint.lng - lng * (i + 1), prvePoint.lat + lat * (i + 1));
		}
	}
	if(prvePoint.lng < newPoint.lng && prvePoint.lat > newPoint.lat) {
		lat = Math.abs(prvePoint.lat - newPoint.lat) / num;
		lng = Math.abs(prvePoint.lng - newPoint.lng) / num;
		points[0] = prvePoint;
		for(var i = 1; i < num - 1; i++) {
			points[i] = new BMap.Point(prvePoint.lng + lng * (i + 1), prvePoint.lat - lat * (i + 1));
		}
	}
	if(prvePoint.lng < newPoint.lng && prvePoint.lat < newPoint.lat) {
		lat = Math.abs(prvePoint.lat - newPoint.lat) / num;
		lng = Math.abs(prvePoint.lng - newPoint.lng) / num;
		points[0] = prvePoint;
		for(var i = 1; i < num - 1; i++) {
			points[i] = new BMap.Point(prvePoint.lng + lng * (i + 1), prvePoint.lat + lat * (i + 1));
		}
	}

	return points;
}

/**
 *获取多个同一个点
 *@param point 复制的坐标
 *@param num  复制的数量
 * @return points  坐标数组
 */
function addCoord(point, num) {

	var points = []
	for(var i = 0; i < num; i++) {
		points[i] = point
	}

	return points
}
