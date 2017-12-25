/**
 * @author Kulwant
 * 
 * CreatedOn: Sep 3, 2016
 * 
 * UpdatedOn: May 4, 2017
 * 
 */

"use strict";
module.exports = function(options = { logger : console }){
	let logger = options.logger;
	return {
			syncFor : function syncFor(list, eachItemFn, cb){
				logger.info("Running for loop in sync on list");
				let index = 0;
				if(list && Array.isArray(list)){
					var listLength = list.length;
					if(listLength == 0){
						throw new Error("Passed List should have length greater than 0");
					}else{
						let iterFn = function(err, data){
							if(err){
								logger.info(" Element at index " + index + " in list had errors while finishing processing");
								return cb(err);
							}
							logger.info(" Element at index " + index + " in list finished processed ");
							index++;
							if(index == listLength){
								logger.info(" All the elements got processed. Calling final callback ");				
								return cb(null, data);
							}
							eachItemFn(list[index], index, iterFn);
						}
						eachItemFn(list[index], index, iterFn);
					}
				}else{
					throw new Error("first argument of syncFor should be list");
				}
			},
		
		asyncFor : function asyncFor(list, eachItemFn, cb){
				
				var counter = 0;
				
				if(list && Array.isArray(list)){
					if(list.length == 0){
						throw new Error("Passed List should have length greater than 0");
					}
					let errorArray = [];
					list.forEach(function(value, index){
						eachItemFn(value, function(err, data){
							if(err){
								errorArray.push({index, error: err});
							}
							counter++;
							if(counter == list.length){
								if(errorArray.length > 0){
									return cb(errorArray);
								}else{
									return cb();
								}
							}
						});
					});
				}else{
					throw new Error("first argument of asyncFor should be list");
				}
			},
		
		callbackCaller : function callbackCaller(count, cb){
				
				let counter = 0
					,error = null
					,rTurn = [];
				
				if(count == counter){
					throw new Error("First argument of callbackCaller should be a number greater than 0");
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
			}
	}
}
