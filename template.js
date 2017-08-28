#!/usr/local/bin/node
//template.js
const FileSystem = require('fs');
const HandleBars = require('handlebars');

var Standard = require('./standard_functions.js');
var Site = require('./site.js');

var Templates = [];
console.log("Templates: ", Templates);

exports.LoadDirectory = function Template_Load_Directory(directory){
	console.log("%s: ", arguments.callee.name, directory);
	var _return = [0,null];
	var files = FileSystem.readdirSync(directory); //site/views
	console.log(files);
	for(var file_number = 0; file_number < files.length; file_number++){
		var Template = {
			name: files[file_number],
			template: null
		};
		console.log("number: %d name: %s template: %s", file_number, files[file_number], Template.name);
		var data = FileSystem.readFileSync(directory+files[file_number])
		console.log(data);
		Template.template = HandleBars.compile(data.toString());
		console.log(Template);
		Templates.push(Template);
	}
	_return = [1,files];
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
exports.Lookup = function Template_Lookup(name){
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
exports.Header = function Template_Header(name, description, keywords, mobile, css, js){
	console.log("%s: %s %s %s %d %d %d", arguments.callee.name, name, description, keywords, mobile, css, js);
	var _return = [];
	var template_result = Template_Lookup('header.hbs');
	if(template_result[0] == 1){
		var template = template_result[1];
		var context = {
			title: name,
			description: description,
			keywords: keywords,
			site: Site.Info,
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
exports.Footer = function Template_Footer(){
	console.log("%s: ", arguments.callee.name);
	var _return = [];
	var template_result = Template_Lookup('footer.hbs');
	if(template_result[0] == 1){
		var template = template_result[1];
		var footer = template();
		_return = [1,footer];
	}
	else _return = [0,template_result];
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
exports.Page = function Template_Page(header, body, footer){
	console.log("%s: ", arguments.callee.name, header, body, footer);
	var _return = [0,null];
	var template_result = Template_Lookup('page.hbs');
	if(template_result[0] == 1){
		var template_function = template_result[1];
		var context = {
			header: header,
			body: body,
			footer: footer
		};
		var page = template_function(context);
		_return = [1,page];
	}
	else _return = [0,template_result];
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}