#!/usr/local/bin/node
//standard_functions.js
//function_primitives.js
exports.callback = function Standard_Result_Callback(error, result){
	console.log("%s: ", arguments.callee.name, error, result);
	return result;
}
exports.success = function Standard_Promise_Success(value){
	console.log("%s: ", arguments.callee.name, value);
	return value;
}
exports.failure = function Standard_Promise_Failure(error){
	console.log("%s: ", arguments.callee.name, error);
	return error;
}
//standardparams.js
exports.params = function Standard_Params_Header(request){
	console.log("%s: ", arguments.callee.name, request);
	var _return = [true,true,true];
	var mobile, css, js;
	if(request.params.nomobile == 1) mobile = false;
	else mobile = true;
	if(request.params.nocss == 1) css = false;
	else css = true;
	if(request.params.nojs == 1) js = false;
	else js = true;
	_return = [mobile,css,js];
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
exports.json = function Standard_Params_JSON(request){
	console.log("%s: ", arguments.callee.name, request);
	var _return = false;
	if(request.params.json == 1) _return = true;
	else _return = false;
	console.log("%s returned: ", arguments.callee.name, _return);
	return _return;
}
