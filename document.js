#!/usr/local/bin/node
//document.js

var StandardParams = require('./standardparams.js');

exports.AllDocuments = function AllDocuments(request, response){
	console.log("%s: ", arguments.callee.name, request, response);
	var standard_params_result = StandardParams(request);
	var header = Header('Documents', 'Listing all documents.', 'list view documents database index', standard_params_result[0], standard_params_result[1], standard_params_result[2]);
	var all_docs = Database.GetAllDocuments(DocumentDB);
	console.log(all_docs);
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
