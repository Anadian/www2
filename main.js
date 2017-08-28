#!/usr/local/bin/node
var Express = require('express');

var Standard = require('./standard_functions.js');
var Site = require('./site.js');
var Database = require('./database.js');
var Template = require('./template.js');

var ExpressApplication = Express();

Template.LoadDirectory('./site/views');

var Document_Routs = require('./document.js');

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

function TestPage(request, response){
	console.log("%s: ", arguments.callee.name, request);
	var testdocument = {
		_id: "test_doc",
		value: math.random()
	};
	var PutDocument_return = Database.PutDocument(DataBase, testdocument);
	console.log("%s response: ", arguments.callee.name, PutDocument_return, response);
}
function WelcomePage(request, response){
	console.log("%s: ", arguments.callee.name, request);
	var standard_params_result = StandardParams(request);
	console.log(standard_params_result);
	var header = Header('Welcome Page', 'The welcome page.', 'hello', standard_params_result[0], standard_params_result[1], standard_params_result[2]);
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
	console.log("%s response: ", arguments.callee.name, response);
}
ExpressApplication.get('/documents', Document_Routs.All);
ExpressApplication.get('/document/view/:document_id', Document_Routs.View);
//ExpressApplication.get('/document/edit/:document_id', DocumentWrite);
//ExpressApplication.post('/document/post', DocumentPost);
//ExpressApplication.get('/test', TestPage);
ExpressApplication.get('/welcome/:name?', WelcomePage);
ExpressApplication.get('/', WelcomePage);
//console.log('Starting server: ', app);
ExpressApplication.listen(8000);
