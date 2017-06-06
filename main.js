#!/usr/local/bin/node
var filesystem = require('fs');
var express = require('express');
var handlebars = require('handlebars');
//var jquery = require('jquery');
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
	//console.log(Templates);
	for(var i = 0; i < Templates.length; i++){
		//console.log(Templates[i].name);
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
	else _return = [0,template_result];
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
function Footer(){
	console.log("%s: ", arguments.callee.name);
	var _return = [];
	var template_result = TemplateLookup('footer.hbs');
	if(template_result[0] == 1){
		var template = template_result[1];
		var footer = template();
		_return = [1,footer];
	}
	else _return = [0,template_result];
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
function Welcome(person){
	console.log("%s: %s", arguments.callee.name, person);
	var _return = [];
	var template_result = TemplateLookup('welcome.hbs');
	if(template_result[0] == 1){
		var template = template_result[1];
		var context = {
			name: person
		};
		var welcome = template(context);
		_return = [1,welcome];
	}
	else _return = [0,template_result];
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
function Page(header, body, footer){
	console.log("%s: %s %s %s", arguments.callee.name, header, body, footer);
	var _return = [];
	var template_result = TemplateLookup('page.hbs');
	if(template_result[0] == 1){
		var template = template_result[1];
		var context = {
			header: header,
			body: body,
			footer: footer
		};
		var page = template(context);
		_return = [1,page];
	}
	else _return = [0,template_result];
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
function WelcomePage(request, response){
	console.log(request);
	var header = Header('Welcome Page', 'The welcome page.', 'hello', true, true, true);
	if(request.params.name != null) var name = request.params.name;
	else var name = 'there';
	var welcome = Welcome(name);
	var footer = Footer();
	if((header[0] == 1) && (welcome[0] == 1) && (footer[0] == 1)){
		page = Page(header[1], welcome[1], footer[1]);
		if(page[0] == 1){
			response.send(page[1]);
		}
		else response.send(page);
	}
	else response.send('Internal error');
	console.log(response);
}
application.get('/welcome/:name?', WelcomePage);
application.get('/', WelcomePage);
//console.log('Starting server: ', app);
application.listen(8000);
