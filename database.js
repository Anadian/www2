//server/database.js
var Primitives = require('function_primitives.js');

exports.GetDocument = function GetDocument(database, document_id){
	console.log("%s: ", arguments.callee.name, database, document_id);
	var _return = [0,null];
	//var database_get_result = database.get(document_id, Primitives.callback);
	//console.log(database_get_result);
	var database_get_promise = await database.get(document_id).then(Primitives.success).catch(Primitives.failure);
	console.log(database_get_promise);
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
exports.PutDocument = function PutDocument(database, document){
	console.log("%s: ", arguments.callee.name, database, document);
	var _return = [0,null];
	//var database_put_result = database.put(document, Primitives.callback);
	//console.log(database_put_result);
	var database_put_promise = await database.put(document).then(Primitives.success).catch(Primitives.failure);
	console.log(database_put_promise);
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}	
exports.DeleteDocument = function DeleteDocument(database, document_id){
	console.log("%s: ", arguments.callee.name, database, document_id);
	var _return = [0,null];
	var document = GetDocument(database, document_id);
	//var database_remove_result = database.remove(document, Primitives.callback);
	//console.log(database_remove_result);
	var database_remove_promise = await database.remove(document).then(Primitives.success).catch(Primitives.failure);
	console.log(database_remove_promise);
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
exports.GetAllDocuments = function GetAllDocuments(database){
	console.log("%s: ", arguments.callee.name, database);
	var _return = [0,null];
	var database_allDocs_result = await database.allDocs().then(Primitives.success).catch(Primitives.failure);
	console.log(database_allDocs_result);
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}