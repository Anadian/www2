//function_primitives.js
exports.callback = function Result_Callback(error, result){
	console.log("%s: ", arguments.callee.name, error, result);
	return result;
}
exports.success = function Promise_Success(value){
	console.log("%s: ", arguments.callee.name, value);
	return value;
}
exports.failure = function Promise_Failure(error){
	console.log("%s: ", arguments.callee.name, error);
	return error;
}
