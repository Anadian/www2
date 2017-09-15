#!/usr/local/bin/node
/**
*	@file source/log.js
*	@author Anadian
*	@copyright MIT License:
	Copyright 2017 Canosw
	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:
	The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const Utility = require('util');
const FileSystem = require('fs');
const Chalk = require('chalk');

var date = new Date();
var LogConsole{
	enabled: true,
	stream: 'stderr',
	colour: true,
	level: 'info'
}
var LogFile{
	enabled: true,
	filename: date.toISOString().replace(/[-:\.]/g, '')+'.log',
	level: 'debug'
};

function ConsoleFormatter(level_name, module_name, function_name, message){
	var _return = null;
	var colour;
	switch(level_name){
		case 'error': colour = Chalk.red; break;
		case 'warn': colour = Chalk.yellow; break;
		case 'note': colour = Chalk.magenta; break;
		case 'info': colour = Chalk.blue; break;
		case 'debug': colour = Chalk.green; break;
		default: colour = function no_colour(){ return arguments; }; break;
	}
	_return = colour(util.format("%s:%s:%s %s", Chalk.bold(level_name), Chalk.dim(module_name), Chalk.underline(function_name), message));
	return _return;
}
function FileFormatter(process_name, module_name, file_name, function_name, level_name, message){
	var _return = null;
	var date = new Date();
	_return = util.format("%s %s:%s:%s:%s:%s %s", date.toISOString(), process_name, module_name, file_name, function_name, level_name, message);
	return _return;
}
exports.log = function Log(process_name, module_name, file_name, function_name, level_name, message){
	var _return = null;
	var date = new Date();
	var string = date.toISOString()+' '+process_name+':'+module_name+':'+file_name+':'+function_name+':'+level_name+': ';
	if(arguments.length >= 6){
		var array = [];
		for(var i = 6; i < arguments.length; i++){
			array.push(Utility.inspect(arguments[i]));
		}
		