var forio = require('./for-io')();
var assert = require('assert');

const api ={
  call : function(person, cb){
    setTimeout(function(){
      if(person.name){
        cb(null, person);
      }else{
          cb("Person with no name");
        }
    }, 100)
  }

} 
const person1 = {
  name : 'Bob',
  age : 29
}
const person2 = {
  name : 'Alice',
  age : 30
}
const person3 = {
  name : 'Melvin',
  age : 28
}
const noNamePerson = {
  name : null,
  age: 28
}
const list = [person1, person2, person3];
const list2 = [person1, noNamePerson, person3];
const list3 = [person1, noNamePerson, noNamePerson];

describe('SyncFor', function() {

  describe('passing null incase of list', function() {
    
        let error = "some error";
        before(function(done){
          try{
            forio.syncFor(null, function(person, index, next){
              
              api.call(person, function(err, data){
                next(err);
              });
        
            }, function(err){
                error = err;
                done();
            });
          }catch(e){
            error = e;
            done();
          }
        })
        it('null is passed instead of list', function(){
          assert.equal(error.message, "First argument of syncFor should be list"); 
        })
    
  });

  describe('passing empty list', function() {
    
        let error = "some error";
        before(function(done){
          try{
            forio.syncFor([], function(person, index, next){
              
              api.call(person, function(err, data){
                next(err);
              });
        
            }, function(err){
                error = err;
                done();
            });
          }catch(e){
            error = e;
            done();
          }
        })
        it('list is empty', function(){
          assert.equal(error.message, "Passed List should have length greater than 0"); 
        })
    
  });
  
  describe('no error in list', function() {

    let error = "some error";
    before(function(done){
      forio.syncFor(list, function(person, index, next){
        
        api.call(person, function(err, data){
          next(err);
        });
  
      }, function(err){
          error = err;
          done();
        });
      })
      it('Error should be null', function(){
        assert.equal(error, null); 
      })

  });

  describe('one error in list', function() {
    let err = "some error";

    before(function(done){
      forio.syncFor(list2, function(person, index, next){
        
        api.call(person, function(err, data){
          next(err);
        });
  
      }, function(error){
        err = error;
        done()
      });
    });

    it("Error should be object", function(){
      assert(!Array.isArray(err) && typeof err == "object");
    })
  
    it("error should match particular syntax", function(){
      assert.deepEqual(err, {index:1, message: "Person with no name"});
    })
  });

  describe('two error in list', function() {
    let err = "some error";

    before(function(done){
      forio.syncFor(list3, function(person, index, next){
        
        api.call(person, function(err, data){
          next(err);
        });
  
      }, function(error){
        err = error;
        done()
      });
    });

    it("Error should be object", function(){
      assert(!Array.isArray(err) && typeof err == "object");
    })

    it("error should match particular syntax", function(){
      assert.deepEqual(err, {index:1, message: "Person with no name"});
    })
  });

});

describe('AsyncFor', function() {
  
  describe('passing null incase of list', function() {
    
        let error = "some error";
        before(function(done){
          try{
            forio.asyncFor(null, function(person, index, next){
              
              api.call(person, function(err, data){
                next(err);
              });
        
            }, function(err){
                error = err;
                done();
            });
          }catch(e){
            error = e;
            done();
          }
        })
        it('null is passed instead of list', function(){
          assert.equal(error.message, "First argument of asyncFor should be list"); 
        })
    
  });

  describe('passing empty list', function() {
    
        let error = "some error";
        before(function(done){
          try{
            forio.asyncFor([], function(person, index, next){
              
              api.call(person, function(err, data){
                next(err);
              });
        
            }, function(err){
                error = err;
                done();
            });
          }catch(e){
            error = e;
            done();
          }
        })
        it('list is empty', function(){
          assert.equal(error.message, "Passed List should have length greater than 0"); 
        })
    
  });
  describe('no error in list', function() {

    let error = "some error";
    before(function(done){
      forio.asyncFor(list, function(person, index, next){
        
        api.call(person, function(err, data){
          next(err);
        });

      }, function(err){
          error = err;
          done();
        });
      })
      it('Error should be null', function(){
        assert.equal(error, null); 
      })

  });

  describe('one error in list', function() {
    let err = "some error";

    before(function(done){
      forio.asyncFor(list2, function(person, index, next){
        
        api.call(person, function(err, data){
          next(err);
        });
  
      }, function(error){
        err = error;
        done()
      });
    });

    it("Error should be array", function(){
      assert(Array.isArray(err));
    })
    it("Error array length should be 1", function(){
      assert(err.length == 1);
    })
    it("error should match particular syntax", function(){
      assert.deepEqual(err, [{index:1, message: "Person with no name"}]);
    })
  });

  describe('two error in list', function() {
    let err = "some error";

    before(function(done){
      forio.asyncFor(list3, function(person, index, next){
        
        api.call(person, function(err, data){
          next(err);
        });
  
      }, function(error){
        err = error;
        done()
      });
    });

    it("Error should be array", function(){
      assert(Array.isArray(err));
    })
    it("Error array length should be 2", function(){
      assert(err.length == 2);
    })
    it("error should match particular syntax", function(){
      assert.deepEqual(err, [{index:1, message: "Person with no name"}, {index: 2, message: "Person with no name"}]);
    })
  });
  
});