//server/database.js
var Primitives = require('./function_primitives.js');

exports.GetDocument = async function GetDocument(database, document_id){
	console.log("%s: ", arguments.callee.name, database, document_id);
	var _return = [0,null];
	try{
		var document = await database.get(document_id);
		console.log(document);
		_return = [1,document];
	} catch(error){
		console.log("Error: ", error);
		_return = [0,error];
	}
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
exports.PutDocument = async function PutDocument(database, document){
	console.log("%s: ", arguments.callee.name, database, document);
	var _return = [0,null];
	try{
		var result = await database.put(document);
		console.log(result);
		_return = [1,result];
	} catch(error){
		console.log("Error: ", error);
		_return = [0,error];
	}
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}	
exports.DeleteDocument = async function DeleteDocument(database, document_id){
	console.log("%s: ", arguments.callee.name, database, document_id);
	var _return = [0,null];
	var document = GetDocument(database, document_id);
	try{
		var result = await database.remove(document);
		console.log(result);
		_return = [1,result];
	} catch(error){
		console.log("Error: ", error);
		_return = [0,error];
	}
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
exports.GetAllDocuments = async function GetAllDocuments(database){
	console.log("%s: ", arguments.callee.name, database);
	var _return = [0,null];
	try{
		var result = await database.allDocs();
		console.log(result);
		_return = [1,result];
	} catch(error){
		console.log("Error: ", error);
		_return = [0,error];
	}
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}