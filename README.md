# for-io

for-io helps you perform async(io) operation on every item in List in more manageable fashion and also helps you keep your code clean.


## Installation


```
$ npm install for-io
```


## How it works
Package exposes two functions which will make your life much easier on handling list. Both does the same thing but in different way i.e parallel and sequential way.


###    syncFor
Executes callback function on every item in sequential manner.

    // importing package
    const forio = require("for-io")();

    let person1 = {
      firstName : "bob",
      lastName : "backoff"
    }
    let person2 = {
      firstName: "alice",
      "lastName" : "backoff"
    }

    var personsList = [person1, person2 ....];

    /*
    * REQUIREMENT:-
    * 1. Calling third party API which accepts one person at one time.
    * 2. Stop calling API when there is error with person.
	  *
    */
     
    forio.syncFor(personList, function(item, index, next){
      api.call(person, function(err, rs){
          next(err, rs);
	    });
    },function(err){
        // CODE WHEN OPERATION ON LIST FINISHES
    });
    
    
#### let me break this down for you

syncFor function accepts three arguments
* list of item
* Function you want to execute on each item in array

    This function is called by package with three arguments

    > **a.** item   
    > **b.** index of item  
    > **c.** next - function when called notifies the library that  processing on current item is done.

* cb/callback function you want to execute when list is traversed successfully.
  First argument will be error object in case of error otherwise it will be null.  
NOTE:- This callback will be called instantaneously when error is encountered while processing list.

<br/>

###    asyncFor
Executes callback function on every item in parallel.

    // importing package
    const forio = require("for-io")();

    let person1 = {
      firstName : "bob",
      lastName : "backoff"
    }
    let person2 = {
      firstName: "alice",
      "lastName" : "backoff"
    }

    var personsList = [person1, person2 ....];

    /*
    *
    * REQUIREMENT
    * 1. You want to publish messages in queue for each person in list. You will do this parallel.
	  *
    */
     
    forio.asyncFor(personList, function(item, index, next){
      queue.publish(person, function(err, rs){
        		next(err, rs);
	    });
    },function(err){
          // CODE WHEN OPERATION ON LIST FINISHES
    });
    
    
#### let me break this down for you

asyncFor function accepts three arguments
* list of item
* Function you want to execute on each item in array

    This function is called by package with three arguments

    > **a.** item   
    > **b.** index of item  
    > **c.** next - notifies library that processing on current item is done.

* cb/callback function you want to execute when every item is traversed successfully.
First argument will be array of error in case of error otherwise it will be null.  
NOTE:- In case of error, This will be called after completion of list traverse.
It will have error as parameter which will be list of object with index and actual error.

<br/>

###  callbackCaller
Returns fn function which after executing n number of times will execute the the callback function you wants to execute.
    
    var forio = require("for-io")();
    
    var person = {
        firstName : "bob",
        lastName : "backoff"
      }

    /* 
    * REQUIREMENT
      1. You want to perform three different operations parallely
	 */
     
    var length = personsList.length;

    var fn = forio.cbCaller(length, function finalCb(){
        // CODE TO EXECUTE AFTER TWO ASYNC OPERATIONS
    });

    db.insert(person, function(err, rs){
        fn(err);
    });

    api.call(person, function(err, rs){
        fn(err);
    })



#### let me break this down for you

callbackCaller accepts two arguments
* length of array 
* callback function you want to execute when callback caller called n number of times.

cbCaller returns a function fn which called n times will call final callback function.


### Development

Want to contribute? Great.

Please leave pull request at github project here
[for-io](https://github.com/KlwntSingh/for-io)


License
----

MIT
