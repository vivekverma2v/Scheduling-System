'use strict';
/*
    @FileName - dependency.js
    @Author - Vivek Verma
    @Date - 13/07/2019
    @Description - create dependencies between two task 
*/

var Task = require('../entity/task');

module.exports = class Dependency {
  
    constructor(task1, task2) {
        this.task1 = task1;
        this.task2 = task2;        
    }   
}