/**
 * 自定义路书---本人后端，前端写的有点简陋，请多多包涵.
 */
(function() {
	var customLushu = function(map, path, options) {

		//如果路径信息小于1或者为空,则直接返回
		if(!path || path.length <= 0) {
			return;
		}
		this._path = path
		//百度地图
		this._map = map;
		//图标
		this.iconMkr = null;
		//icon运行时，路径的下标
		this.i = 0;
		//定时器
		this._pause = null;
		//赋值默认值
		this._opt = $.extend({
			speed: 50,
			icon: null,
			strokeColor: '#ff0000',
			strokeWeight: 2,
			strokeOpacity: 0.9
		}, options);

		this.initMarker();
	};
	/**
	 * 根据道路总坐标，绘画出轨迹以及目标图标
	 */
	customLushu.prototype.initMarker = function() {
		//绘画轨迹
		this._map.addOverlay(new BMap.Polyline(this._path, {
			strokeColor: this._opt.strokeColor,
			strokeWeight: this._opt.strokeWeight,
			strokeOpacity: this._opt.strokeOpacity
		}));

		//绘画图标
		this.iconMkr = new BMap.Marker(this._path[0], {
			icon: this._opt.icon
		});
		this._map.addOverlay(this.iconMkr)

	};

	/**
	 * 开始播放
	 */
	customLushu.prototype.start = function() {
		var that = this;
		//获得有几个点
		var paths = this._path.length;
		//自调方法
		function move() {
			that.iconMkr.setPosition(that._path[that.i]);
			if(that.i < paths) {
				that._pause = setTimeout(function() {
					that.i++;
					move(that.i);
				}, that._opt.speed);
			}
		}
		setTimeout(function() {
			move(this.i);
		}, this._opt.speed)
	}

	/**
	 * 播放暂停
	 */
	customLushu.prototype.stop = function() {
		clearTimeout(this._pause);
	}

	/**
	 * 播放加快---三种播放速度,适用于默认速度,如果自定义起始速度，可以自己修改
	 */
	customLushu.prototype.fast = function() {
		if(this._opt.speed == 50) {
			this._opt.speed = 25;
		} else if(this._opt.speed == 25) {
			this._opt.speed = 5;
		} else {
			this._opt.speed = 50;
		}
	}
	window.customLushu = customLushu;
}());