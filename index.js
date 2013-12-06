/*
	You can ignore this section, it's used for monitoring and is specific to my environment
*/
require('strong-agent').profile(
	process.env.NODEFLY_KEY,
	['Taffy Docs','Heroku'],
	{
		// time in ms when the event loop is considered blocked
		blockThreshold: 10
	}
);

/*
	This is a simple way to host the generated documentation using Express
	-- There's probably a leaner way, but this is literally 5 lines of code.
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

cassini.generate({
	inputDir: path.normalize(__dirname + '/src/')
	,outputDir: path.normalize(__dirname + '/bin/')
	,templatePath: path.normalize(__dirname + '/templates/')
	,verbose: true
});