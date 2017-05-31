#!/usr/local/bin/node
var filesystem = require('fs');
var express = require('express');
var handlebars = require('handlebars');
var jquery = require('jquery');
var application = express();

const Site = {
	name: 'Cool',
	description: 'Bro',
	keywords: 'site',
	icon: null,
};	
//console.log(handlebars);
var Templates = [];
var files = filesystem.readdirSync('./views');
console.log(files);
for(var file_number = 0; file_number < files.length; file_number++){
	var Template = {
		name: files[file_number],
		template: null
	};
	console.log("number: %d name: %s template: %s", file_number, files[file_number], Template.name);
	var data = filesystem.readFileSync('./views/'+files[file_number])
	console.log(data);
	Template.template = handlebars.compile(data.toString());
	console.log(Template);
	Templates.push(Template);
}
function TemplateLookup(name){
	console.log("%s: %s", arguments.callee.name, name);
	var _return = [0,name];
	for(var i; i < Templates.length; i++){
		if(Templates[i].name == name) _return = [1,Templates[i].template];
	}
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
function Header(name, description, keywords, mobile, css, js){
	console.log("%s: %s %s %s %d %d %d", arguments.callee.name, name, description, keywords, mobile, css, js);
	var _return = [];
	var template_result = TemplateLookup('header.hbs');
	if(template_result[0] == 1){
		var template = template_result[1];
		var context = {
			title: name,
			description: description,
			keywords: keywords,
			site: Site,
			mobile: mobile,
			css: css,
			js: js
		};
		var header = template(context);
		_return = [1,header];
	}
	else _return = [0,result];
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
function Topbar(navigation, user){
	console.log("%s: ", arguments.callee.name, navigation, user);
	var _return = [];
	var template_result = TemplateLookup('topbar.hbs');
	if(template_result[0] == 1){
		template = result[1];
		var context = {
			navbar: navigation,
			account: user
		};
		var topbar = template(context);
		_return = [1,topbar];
	}
	else _return = [0,template_result];
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
function Footer(){
	console.log("%s: ", arguments.callee.name);
	var _return = [];
	var template_result = 
function Welcome(title, message){
	console.log("%s: %s %s", arguments.callee.name, title, message);
	var _return = [];
	var template_result = TemplateLookup('welcome.hbs');
	if(template_result[0] == 1){
		var template = template_result[1];
		var context = {
			title: title
		};
		var welcome = template(context);
		_return = [1,welcome];
	}
	else _return = [0,template_result];
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
function Page(header, topbar, body, footer){
	

application.get('/welcome/:name', function WelcomePage(request, response){
	Page(Header(), Topbar()

application.get('/', function(request,response){
	console.log(Templates, request);
	
	response.send('Hello World');
});
//console.log('Starting server: ', app);
application.listen(8000);
