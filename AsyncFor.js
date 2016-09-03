/**
 * @author Kulwant
 * 
 * Sep 3, 2016
 */

!function(){
	"use strict";
	
	module.exports.asyncFor = function asyncFor(list, eachItemFn, cb, isArray, index){
		index = index ? index : 0;
		var listLength = list.length;
		if(isArray || (list && Array.isArray(list) && listLength>0)){
			eachItemFn(list[index], index, function(err, data){
				index++;
				if(err){
					return;
				}
				if(index == listLength){				
					return cb(null, data);
				}
				asyncFor(list, eachItemFn, cb, true, index);
			});
		}
	};
	
	module.exports.callbackCaller = function asyncFor(count, cb){
		
		var counter = 0;
		var error = null;
		var fn = function(err, rs){
			if(err){
				error = err;
			}
			counter++;
			if(count === counter){
				cb(error, rs);
			}
		};
		
		return fn;
	};
	
}();
