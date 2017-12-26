/**
 * @author Kulwant
 * 
 * CreatedOn: Sep 3, 2016
 * 
 * UpdatedOn: Dec 25, 2017
 * 
 */

"use strict";
module.exports = function(options = { logger : console }){
	let logger = {
		info: function(){
			if(options.logger){
				let args = arguments;
				options.logger.info.apply(options, args);
			}
		}
	};
	return {
		syncFor : function syncFor(list, eachItemFn, cb){
			logger.info("Running for loop in sync on list");
			let index = 0;
			if(list && Array.isArray(list)){
				var listLength = list.length;
				if(listLength == 0){
					throw new Error("Passed List should have length greater than 0");
				}else{
					let iterFn = function(err){
						if(err){
							logger.info(" Element at index " + index + " in list had errors while finishing processing");
							let errorObj = {index, message : err};
							logger.info("Calling final callback");
							return cb(errorObj);
						}
						logger.info(" Element at index " + index + " in list finished processed ");
						index++;
						if(index == listLength){
							logger.info("All the elements got processed. Calling final callback ");				
							return cb(null);
						}
						eachItemFn(list[index], index, iterFn);
					}
					eachItemFn(list[index], index, iterFn);
				}
			}else{
				throw new Error("First argument of syncFor should be list");
			}
		},
		asyncFor : function asyncFor(list, eachItemFn, cb){
			logger.info("Running for loop in async on list");
			let self = this;
			let index = 0;
			if(list && Array.isArray(list)){
				if(list.length == 0){
					throw new Error("Passed List should have length greater than 0");
				}
				let errorArray = [];
				var fn = self.callbackCaller(list.length, cb)
				list.forEach(function(value, index){
					eachItemFn(value, index, fn);
				});
			}else{
				throw new Error("First argument of asyncFor should be list");
			}
		},

		callbackCaller : function callbackCaller(count, cb){
			logger.info("CallbackCaller function called");

			let index = 0;

			if(count == index){
				throw new Error("First argument of callbackCaller should be a number which is greater than 0");
			}

			let errorArray = [];		
			var fn = function(err){
				if(err){
					logger.info(" CallbackCaller function called " + index + " time has error");
					errorArray.push({index, message: err})
				}else{
					logger.info(" CallbackCaller function called " + index + " time ");
				}
				index++;
				if(count === index){
					logger.info("CallbackCaller callback function called ");
					if(errorArray.length > 0){
						cb(errorArray);
					}else{
						cb(null);
					}
				}
			};
			return fn;
		}
	}
}
