var util = require(__dirname + '/../libs/util.js');


module.exports = function (express, app) {

    // Common configuration
    app.configure(function () {

        // set global variabled to use in the templates
        app.locals({
            domain: 'www.apple-tracker.com',
            url: 'http://www.apple-tracker.com'
        });


        // Configure jQuery template engine
        express.version = require('express/package.json').version;
        app.set('views', __dirname + '/../views');
        app.set('view engine', 'jade');
        app.set('layout', true);


        app.engine('jade', require('jade').__express);

        app.use(express.compress());
        app.use(express.bodyParser());

        app.use(app.router);

        // Make sure build folders exist
        util.mkdir(__dirname + '/../build');
        util.mkdir(__dirname + '/../build/css');

        // Configure LESS compiler
        app.use('/css', require('less-middleware')({
            src: __dirname + '/../src/less',
            dest: __dirname + '/../build/css',
            yuicompress: true
        }));

        // Create static file servers for the build and public folders
        app.use(express.static(__dirname + '/../build'));
        app.use(express.static(__dirname + '/../public'));
    });

    // Development specific configuration
    app.configure('development', function () {
        
        app.locals({
            pretty: true //dont minify the html
        });

        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });

    // Production specific configuration
    app.configure('production', function () {
        //app.use(express.errorHandler());
    });

};