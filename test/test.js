/*
    @FileName - test.js
    @Author - Vivek Verma
    @Date - 13/07/2019
    @Description - jUnit test cases of program
*/

var assert = require('chai').assert;
var expect = require('chai').expect;
var ExcecutorService = require('../service/exceutor')
var Task = require('../entity/task.js');


var taskA = new Task('A');
var taskB = new Task('B');
var taskC = new Task('C');
var taskD = new Task('D');
var taskE = new Task('E');
var taskF = new Task('F');
var taskG = new Task('G');

describe('Task is cyclic or not', function(){
   
    it('should return an cyclic', function(){
        var service = new ExcecutorService();

        service.addTask(taskA);
        service.addTask(taskB);
        service.addTask(taskC);

        service.addDependencies(taskA, taskB);
        service.addDependencies(taskB, taskC);
        service.addDependencies(taskC, taskA); 

        service.execute();

        var result1 = 'Error - this is a cyclic dependency.';
        var result2 = service.getResultTaskExecuteList()[0];
        assert.equal(result2, result1);
      });
})

describe('Exceuting task based on multiple dependencies', function(){
   
    it('should return an array', function(){
        var service = new ExcecutorService();

        service.addTask(taskA);
        service.addTask(taskB);
        service.addTask(taskC);
        service.addTask(taskD);
        service.addTask(taskE);

        service.addDependencies(taskA, taskB);
        service.addDependencies(taskB, taskC);
        service.addDependencies(taskD, taskE);


        service.execute();

        var result1 = ['C', 'B', 'A', 'E', 'D']
        var result2 = service.getResultTaskExecuteList();
        expect(result2).to.eql(result1);
      });
})


describe('Exceuting task based on no dependencies', function(){
   
    it('should return an array', function(){
        var service = new ExcecutorService();
        service.addTask(taskA);
        service.addTask(taskB);


        service.execute();

        var result1 = ['A', 'B']
        var result2 = service.getResultTaskExecuteList();
        expect(result2).to.eql(result1);
      });
})

describe('Exceuting task based on single dependencies', function(){
   
    it('should return an array', function(){
        var service = new ExcecutorService();

        service.addTask(taskA);
        service.addTask(taskB);
        service.addTask(taskC);
        service.addTask(taskD);

        service.addDependencies(taskA, taskB);
        service.addDependencies(taskC, taskD);


        service.execute();
        var result1 = ['B', 'A', 'D', 'C']
        var result2 = service.getResultTaskExecuteList();
        expect(result2).to.eql(result1);
      });
})


describe('Exceuting task based on 2 multiple dependencies', function(){
   
    it('should return an array', function(){
        var service = new ExcecutorService();

        service.addTask(taskA);
        service.addTask(taskB);
        service.addTask(taskC);
        service.addTask(taskD);
        service.addTask(taskE);
        service.addTask(taskF);
        service.addTask(taskG);
        

        service.addDependencies(taskA, taskB);
        service.addDependencies(taskB, taskC);
        service.addDependencies(taskC, taskD);
        service.addDependencies(taskD, taskE);
        service.addDependencies(taskE, taskF);
        service.addDependencies(taskF, taskG);


        service.execute();
        var result1 = ['G', 'F', 'E', 'D', 'C', 'B', 'A']
        var result2 = service.getResultTaskExecuteList();
        expect(result2).to.eql(result1);
      });
})


describe('Throw error if no task added in task pool', function(){
   
    it('should return an error', function(){
        var service = new ExcecutorService();
        
        expect(()=> service.execute()).to.throw();
      });
})