# for-io

for-io helps you perform async(io) operation on every item in List in more manageable fashion and also helps you keep code clean.


## Installation


```
$ npm install for-io
```


## How it works
It has only two functions which will make your life much easier. Both does the same thing in different way

####    asyncFor
Executes functions in sequential order and than final cb after all those functions have been executed.

	var asyncFor = require("for-io").asyncFor;
    
    var person1 = {
      firstName : "bob",
      lastName : "backoff"
    }

    var personsList = [person1, person2 ....];

    /* you want store list in databases but does not want bulk insert and 
      also want to stop the whole operation if one of enty fails.
	 */
     
    asyncFor(personList, function(item, index, next){
      db.insert(person, function(err, rs){
        		next(err, rs);
	  });
    },function(err, rs){
          cb(err, rs);
    });
    
    
###### let me break down this for you

asyncFor accepts three arguments
* Array 
* Function you want to execute on each item in array

    This function give us three arguments

    > **a.** value   
    > **b.** index  
    > **c.** next - Need to call this function with first argument as err and second as 
                    data which is sent to final cb function.

3. cb/callback function you want to execute when every item is traversed successfully or when something fails

   > Third argument is final callback function
     will be called if next is called with err as first argument.

<br/>

####  callbackCaller
Returns fn function which after executing n number of times will execute the the callback function you wants to execute.
    
   var cbCaller = require("for-io").callbackCaller;
   
   var person1 = {
      firstName : "bob",
      lastName : "backoff"
    }

    var personsList = [person1, person2 ....];

    /* you want store list in databases but does not want to bulk insert  and
       also it will stop the whole operation if one of items fails.
	 */
     
    var length = personsList = personsList.length;
    var fn = cbCaller(length, cb);
    
    personsList.forEach(function(value, index){
    	db.insert(value, function(err, rs){
        	fn(err, rs);
        })
    });


###### let me break down this for you

callbackCaller accepts two arguments
* length of array 
* callback function you want to execute when every item is done.

cbCaller will return function fn which needs to called on every item execution so that final callback function can be called after all the operations have been done.


### Development

Want to contribute? Great!

Please leave pull request at github project here
[for-io](https://github.com/KlwntSingh/for-io)


License
----

MIT
