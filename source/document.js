#!/usr/local/bin/node
//document.js

const Standard = require('./standard_functions.js');
const Database = require('./database.js');
var Database_Create_return = Database.Create('./site/databases/documents');
var DocumentDB = Database_Create_return[1];
Database.Info(DocumentDB);
const Template = require('./template.js');
Template.LoadDirectory('./site/views/document');

exports.All = function Document_Get_AllDocuments(request, response){
	console.log("%s: ", arguments.callee.name, request, response);
	var _response;
	var all_docs = null;
	var all_result = Database.GetAllDocuments(DocumentDB);
	console.log("all_docs_result: ", all_result);
	if(all_result[0] == 1){
		all_docs = all_result[1];
		if(!Standard.json(request)){
			var standard_params_result = Standard.params(request);
			var header, body, footer;
			var header_result = Template.Header('Documents', 'Listing all documents.', 'list view documents database index', standard_params_result[0], standard_params_result[1], standard_params_result[2]);
			//if(header_result[0] == 1) 
			header = header_result[1];
			var all_lookup_result = Template.Lookup('all.hbs');
			if(all_lookup_result[0] == 1){
				var template_function = all_lookup_result[1];
				body = template_function(all_docs);
			} else{
				body = all_lookup_result[1];
			}
			footer_result = Template.Footer();
			//if(footer_result[0] == 1) 
			footer = footer_result[1];
			_response = Template.Page(header, body, footer);
		} else{
			_response = all_docs;
		}
	} else{
		_response = all_result;
	}
	console.log("%s response: ", arguments.callee.name, _response);
	response.send(_response);
}
exports.View = function Document_Get_View(request, response){
	console.log("%s: ", arguments.callee.name, request, response);
	var _response;
	var document = null;
	if(request.params.document_id != null){
		var get_result = Database.GetDocument(DocumentDB, request.params.document_id);
		console.log("get_result: ", get_result);
		if(get_result[0] == 1){
			document = get_result[1];
		} else{
			document = get_result;
			console.log("GetDocument Error: ", get_result);
	} else console.log("document_id Error: ", request.params.document_id);
	if(!Standard.json(request)){
		
	console.log("document: ", document);
	
	