/*
	This is a simple way to host the generated documentation (e.g. on Heroku)
*/
var express  = require('express')
	,pkg      = require('./package.json')
	,cassini  = require('cassini')
	,path     = require('path')
	,app      = express()
	;

var port = process.env.PORT || 5000;

app.use(express.compress())
	.use(express.static('bin'))
	.get('/', function(req,res){
		res.redirect(301, pkg.version+'/');
	})
	.listen(port);

console.log('listening on port %s', port);

cassini.run({
	inputDir: path.normalize(__dirname + '/src/')
	,outputDir: path.normalize(__dirname + '/bin/')
	,verbose: true
});