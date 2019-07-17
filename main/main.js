/*
    @FileName - main.js
    @Author - Vivek Verma
    @Date - 13/07/2019
    @Description - Client program to create task, add in task pool, add dependencies between
                   task, exceute task etc 
*/
var Task = require('../entity/task.js');
var ExcecutorService = require('../service/exceutor');

//Create the task
var taskA = new Task('A');
var taskB = new Task('B');
var taskC = new Task('C');
var taskD = new Task('D');
var taskE = new Task('E');

var service = new ExcecutorService();

//Add the task in task pool
service.addTask(taskA);
service.addTask(taskB);
service.addTask(taskC);

//add dependencies
service.addDependencies(taskA, taskB);
service.addDependencies(taskB, taskC);
service.addDependencies(taskC, taskA);

//Execute the task
service.execute();

//get the list of excecution task
console.log(service.getResultTaskExecuteList());
//-------------------------------------

var service1 = new ExcecutorService();

service1.addTask(taskA);
service1.addTask(taskB);
service1.addTask(taskC);
service1.addTask(taskD);
service1.addTask(taskE);

service1.addDependencies(taskA, taskB);
service1.addDependencies(taskB, taskC);
service1.addDependencies(taskD, taskE);


service1.execute();
console.log(service1.getResultTaskExecuteList());
//-------------------------------------

var service2 = new ExcecutorService();

service2.addTask(taskA);
service2.addTask(taskB);
service2.addTask(taskC);
service2.addTask(taskD);

service2.addDependencies(taskA, taskB);
service2.addDependencies(taskC, taskD);


service2.execute();
console.log(service2.getResultTaskExecuteList());
//-------------------------------------

var service3 = new ExcecutorService();

service3.addTask(taskA);
service3.addTask(taskB);
service3.addTask(taskC);

service3.addDependencies(taskA, taskB);
service3.addDependencies(taskB, taskC);


service3.execute();
console.log(service3.getResultTaskExecuteList());
//-------------------------------------

var service4 = new ExcecutorService();
service4.addTask(taskA);
service4.addTask(taskB);


service4.execute();
console.log(service4.getResultTaskExecuteList());
//-------------------------------------

var service5 = new ExcecutorService();
service5.addTask(taskA);
service5.addTask(taskB);

service5.addDependencies(taskA, taskB);


service5.execute();


console.log(service5.getResultTaskExecuteList());