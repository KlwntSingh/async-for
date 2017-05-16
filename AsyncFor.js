/**
 * @author Kulwant
 * 
 * CreatedOn: Sep 3, 2016
 * 
 * UpdatedOn: May 4, 2017
 * 
 */

!function(){
	"use strict";
	
	module.exports.syncFor = function asyncFor(list, eachItemFn, cb, isArray, index){
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
		}else{
			throw new Error("first argument of syncFor should be list and should have length greater than 0");
		}
	};
	
	module.exports.asyncFor = function asyncFor(list, eachItemFn, cb){
		var counter = 0;
		
		// main return arr
		var rTurn = [];
		if(list && Array.isArray(list)){
			if(list.length == 0){
				throw new Error("Argument list should have elements");
			}
			list.forEach(function(value, index){
				eachItemFn(value, function(){
					var args = arguments;
					
					// loop over arguments of callback of async opr
					for(var innerIndex in args){
						var val = args[innerIndex];
						
						//particular argument array
						var arr = rTurn[innerIndex];
						
						if(!arr){
							arr = [];
							rTurn[innerIndex] = arr;
						}
						
						arr.push({ index : index, data : val});
					}
					counter++;
					if(counter == list.length){
						return cb.apply(this, rTurn);
					}
				});
			});
		}else{
			throw new Error("first argument of asyncFor should be list");
		}
	};
	
	module.exports.callbackCaller = function asyncFor(count, cb){
		
		var counter = 0;
		var error = null;
		var rTurn = [];
		
		if(count == counter){
			throw new Error("first argument of callbackCaller should be a number greater than 0");
		}
		
		var fn = function(){
			var args = arguments;
			
			// loop over arguments passed to callback of async opr
			for(var innerIndex in args){
				// actual value of argument at index
				var val = args[innerIndex];
				var arr = rTurn[innerIndex];
				if(!arr){
					arr = [];
					rTurn[innerIndex] = arr;
				}
				arr.push({index : counter, data: val});
			}
			counter++;
			if(count === counter){
				return cb.apply(this, rTurn);
			}
		};
		
		return fn;
	};
	
}();
