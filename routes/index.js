var share = {
    prod: 'Apple product'
};


module.exports = function (app) {
	app.get('/', render);
};

var render = function(req, res){
	var context = {
		title: 'Apple Device Availability - Apple-Tracker.com',
		share: share
	};
	res.render('index', context);
};