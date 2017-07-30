#!/usr/local/bin/node
//standardparams.js

exports = function StandardParams(request){
	var mobile, css, js;
	if(request.params.nomobile == 1) mobile = false;
	else mobile = true;
	if(request.params.nocss == 1) css = false;
	else css = true;
	if(request.params.nojs == 1) js = false;
	else js = true;
	return [mobile,css,js];
}