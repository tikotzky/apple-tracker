var express = require('express'),
    http = require('http'),
    app = express(),
    opts = require(__dirname + '/config/opts.js'),
    cluster = require('cluster');


if (cluster.isMaster) {
	// Count the machine's CPUs
	var cpuCount = require('os').cpus().length;

	// Create a worker for each CPU
	for (var i = 0; i < cpuCount; i += 1) {
		cluster.fork();
	}

	cluster.on('exit', function (worker) {

		// Replace the dead worker,
		// we're not sentimental
		console.log('Worker ' + worker.id + ' died :(');
		cluster.fork();

	});

} else {

	// Load express configuration
	require(__dirname + '/config/env.js')(express, app);

	// Load routes
	require(__dirname + '/routes')(app);

	require(__dirname + '/routes/iphone5s')(app);
	require(__dirname + '/routes/ipadair')(app);
	require(__dirname + '/routes/ipadminiretina')(app);
	
	
	// Start the server
	http.createServer(app).listen(opts.port, function () {
		console.log("Express server listening on port %d in %s mode", opts.port, app.settings.env);
	});
}