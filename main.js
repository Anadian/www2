#!/usr/local/bin/node
var filesystem = require('fs');
var express = require('express');
var handlebars = require('handlebars');
var jquery = require('jquery');
var app = express();
console.log(handlebars);
function CompileTemplate(var file_descriptor){
	
filesystem.readdir('./views', function (error, files){
	var file;
	for(file = 0; file < files.length; file++){
		CompileTemplate(files[file]);
	}
});
app.get('/', function(request,response){
	var page_context = {
		header_html = null,
		header_context = null,
		body_html = null,
		body_context = null,
		footer_html
	response.send('Hello World');
});
//console.log('Starting server: ', app);
app.listen(8000);
