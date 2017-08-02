#!/usr/local/bin/node
//document.js

var Standard = require('./standard_functions.js');
var Database = require('./database.js');
var Database_Create_return = Database.Create('database/documents');
var DocumentDB = Database_Create_return[1];
Database.Info(DocumentDB);

exports.All = function AllDocuments(request, response){
	console.log("%s: ", arguments.callee.name, request, response);
	var _response;
	if(!Standard.json(request)){
		var standard_params_result = Standard.params(request);
		var header = Header('Documents', 'Listing all documents.', 'list view documents database index', standard_params_result[0], standard_params_result[1], standard_params_result[2]);
		
	} else{
		
	var all_docs = Database.GetAllDocuments(DocumentDB);
	console.log(all_docs);
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
