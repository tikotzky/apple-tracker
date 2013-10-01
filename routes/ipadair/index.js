var request = require('request');
var models = require('../../models');

module.exports = function (app) {
	app.get('/ipad-air', validateParams, getAvailability, render);
};

var devices = models['ipad-air'];

var share = {
    prod: devices.name
};

var render = function(req, res) {
	var modelInfo = req.modelInfo;
	modelInfo.title = 'iPad Air Availability - Apple-Tracker.com';
	modelInfo.share = share;
    modelInfo.appleItemUrl = 'http://store.apple.com/us/buy-ipad/ipad-air';
	res.render('ipad-air', modelInfo);

};

var validateParams = function(req, res, next) {

    var modelInfo = req.modelInfo || {},
        carrier,
        colors,
        color;

    // Get the carrier from the qs - default to wifi
    carrier = req.query.carrier || 'wifi';
    carrier = carrier.toLowerCase();
    // If we are passed an invalid carrier then default to wifi
    if (!devices[carrier]) {carrier = 'wifi';}
    
    modelInfo.carrier = carrier; // this is what is used in code
    modelInfo.carrierNice = devices[carrier].name; //this is what is displayed

    //get all available colors
    colors = devices[carrier];

    //get selected color from the qs
    color = req.query.color || 'gray';
    color = color.toLowerCase();
    if (!colors[color]) {color = 'gray';}

    modelInfo.color = color;
    modelInfo.colorNice = color.charAt(0).toUpperCase() + color.slice(1);

    modelInfo.zip = req.query.zip || '10001';

    //get the model nums based on the selected color
    modelInfo.models = colors[color];

    req.modelInfo = modelInfo;

    next();
};

var getAvailability = function(req, res, next) {

    var modelInfo = req.modelInfo,
        models = modelInfo.models,
        parts,
        uri;

    parts = 'parts.0='+models['16']+'&parts.1='+models['32']+'&parts.2='+models['64']+'&parts.3='+models['128'];
    uri = 'http://store.apple.com/us/retail/availabilitySearch?'+parts+'&zip='+modelInfo.zip;

    modelInfo.uri = uri;

    // request the info from apple
    request(uri, function (error, response, body) {
        try {
            if (!error && response.statusCode === 200) {
                body = JSON.parse(body);
                modelInfo.errorMessage = body.body.errorMessage;
                modelInfo.stores = parseStores(models, body.body, modelInfo);
            } else {
                modelInfo.error = true;
            }
        } catch(e) {
            console.error(e);
            modelInfo.error = true;
        }
        next();
    });

};

var parseStores = function(models, response, modelInfo) {
    var stores = [];
    if (response.stores) {
        for (var i=0; i < response.stores.length; i++) {
            store = response.stores[i];
            var info = {};
            info.name = store.storeName;
            info.href = store.directionsUrl;
            info.json = JSON.stringify({
                storeNumber: store.storeNumber,
                name: store.storeDisplayName,
                href: store.directionsUrl,
                address: store.address.address2,
                city: store.city,
                state: store.state,
                zip: store.address.postalCode,
                phone: store.phoneNumber

            });
            info['128'] = store.partsAvailability[models['128']].storeSelectionEnabled && (store.partsAvailability[models['128']].pickupDisplay === 'available');
            info['64'] = store.partsAvailability[models['64']].storeSelectionEnabled && (store.partsAvailability[models['64']].pickupDisplay === 'available');
            info['32'] = store.partsAvailability[models['32']].storeSelectionEnabled && (store.partsAvailability[models['32']].pickupDisplay === 'available');
            info['16'] = store.partsAvailability[models['16']].storeSelectionEnabled && (store.partsAvailability[models['16']].pickupDisplay === 'available');
            if (info['128'] || info['64'] || info['32'] || info['16']) {modelInfo.foundDevice = true;}
            stores.push(info);
        }
    }
    return stores;
};