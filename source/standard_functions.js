#!/usr/local/bin/node
//standard_functions.js
//function_primitives.js
exports.callback = function Standard_Result_Callback(error, result){
	if(error != null){
		console.error("%s: ", arguments.callee.name, error, result);
	}
	return result;
}
exports.success = function Standard_Promise_Success(value){
	console.log("%s: ", arguments.callee.name, value);
	return value;
}
exports.failure = function Standard_Promise_Failure(error){
	console.error("%s: ", arguments.callee.name, error);
	return error;
}
//standardparams.js
exports.params = function Standard_Params(request){
	console.log("Standard_Params: ", request);
	var _return = null;
	var options = {
		format: 'html', //'text', 'html', 'json', 'markdown', 'raw'
		header: true,
		mobile: true,
		css: true,
		js: true,
		footer: true,
		debug: false,
		minimal: false,
		theme: 'light', //dark, et cetera
		images: 'full', //small, none
		videos: 'embedded', //external, none
		content: 'inclusive', //exclusive (only show the main content; no comments, or similar suggestions)
		safe: true, //warn when leaving site or loading content from other sites.
		restricted: 0, //0 only show 'Family' content; 1, include 'mild discretion'; 2, include 'significant discretion'; 3, include 'restricted' content 
	};
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
