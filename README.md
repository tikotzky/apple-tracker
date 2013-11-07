# Apple Tracker

If you make a publicly accessible copy of this code please submit a pull request to list it in the README
***

## Requirements
* [Node.JS](http://nodejs.org/)

## Installing
* Clone this repo
* Run ```npm install```

### Running Locally
* Run ```node app```
* Go to http://localhost:3000/ in your browser

### Running on heroku
* Create a [heroku](https://www.heroku.com/) account
* Install the [heroku toolbelt](https://toolbelt.herokuapp.com/)
* Run ```heroku create``` it should give you back a url
* * Run ```heroku config:set NODE_ENV=production``` to make the heroku site into production mode
* Run ```git push heroku master``` and wait until it finishes
* Go to the url that heroku gave you in your browser
