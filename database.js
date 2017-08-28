//database.js

var PouchDB = require('pouchdb');
PouchDB.debug.enable('*');

exports.Create = function Database_Create(database_id){
	console.log("%s: ", arguments.callee.name, database_id);
	var _return = [0,null];
	var database = new PouchDB(database_id);
	console.log("database '%s': ", database_id, database);
	_return = [1,database];
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
exports.Close = async function Database_Close(database){
	console.log("%s: ", arguments.callee.name, database);
	var _return = [0,null];
	try{
		await database.close();
		_return = [1,null];
	} catch(error){
		console.log("Error: ", error);
		var error = {
			residing_file: module.filename,
			residing_function: arguments,
			time: Date.now(),
			error: error
		};
		_return = [0,error];
	}
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
exports.Destroy = async function Database_Destroy(database){
	console.log("%s: ", arguments.callee.name, database);
	var _return = [0,null];
	try{
		await database.destroy();
		_return = [1,null];
	} catch(error){
		console.log("Error: ", error);
		_return = [0,error];
	}
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
exports.Info = async function Database_Info(database){
	console.log("%s: ", arguments.callee.name, database);
	var _return = [0,null];
	try{
		var database_info = await database.info();
		console.log(database_info);
		_return = [1,database_info];
	} catch(error){
		console.log("Error: ", error);
		_return = [0,error];
	}
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
exports.GetDocument = async function Database_GetDocument(database, document_id){
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
exports.PutDocument = async function Database_PutDocument(database, document){
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
exports.DeleteDocument = async function Database_DeleteDocument(database, document_id){
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
exports.GetAllDocuments = async function Database_GetAllDocuments(database){
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
