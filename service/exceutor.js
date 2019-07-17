
'use strict';
/*
    @FileName - exceutor.js
    @Author - Vivek Verma
    @Date - 13/07/2019
    @Description - Add task in task pool, add dependencies, check dependencies task is cyclic or not, execute task
                   and return execution list. 
*/

var Parallel = require('async-parallel');
var Dependencies = require('../entity/dependency.js');

module.exports = class ExceutorService {

    constructor(name) {
        this.taskDependices = [];
        this.taskList = [];
        this.dependenciesTask = [];
        this.resultTaskExecuteList = [];
    }   

    //Execute the task 
    execute(){
        if(this.getTaskList().length == 0){
            throw new Error("Error - No task add in task pool.");
        }else if(this.getAddDependenciesTask().length == 0){
            this.executeProcess(this.getTaskList())
        }else{            
            if(this.isCyclic()){
                this.getResultTaskExecuteList().push("Error - this is a cyclic dependency.");
            }else{               
                let depTask = this.getDependeciesTaskList()[0]
                let task = [];
                for(let i = 0; i < depTask.length; ++i){
                    let val = depTask[i];
                    if(val == ','){
                        this.executeProcess(this.reverse(task))
                        task = [];
                    }else{
                        task.push(val);
                    }
                }
                this.executeProcess(this.reverse(task))
            }            
        }        
    }

    //add Dependencies task
    addDependencies(task1, task2){
        if(task1 === task2){
            throw new Error('Could not add same task.');
        }
        if(this.taskDependices.length < 51){
            if(this.getTaskList().includes(task1))
                if(this.getTaskList().includes(task2))
                    this.taskDependices.push(new Dependencies(task1, task2));
                else{
                    let ex = "Task " + task2.name + " add in task pool first."
                    throw new Error(ex);
                }                  
            else{
                let ex = "Task " + task1.name + " add in task pool first."
                throw new Error(ex);
            }
        }             
        else
            console.log('Rejecting the task due to accepting upto 50 task.');
    }

    getAddDependenciesTask(){
        return this.taskDependices;
    }

    getTaskList(){
        return this.taskList;
    }

    getDependeciesTaskList(){
        return this.dependenciesTask;
    }
    
    getResultTaskExecuteList(){
        return this.resultTaskExecuteList;
    }

    // check whether dependencies task is cyclic or not
    isCyclic () {
        let seenObjectsMapTask1 = new Map();
        let seenObjectsMapTask2 = new Map();
        let dependenciesTaskList = [];

        let index = 1;
        
        for(let i = 0; i < this.getAddDependenciesTask().length; ++i){
            let val = seenObjectsMapTask2.get(this.taskDependices[i].task1);
            if(this.isEmpty(val))
                seenObjectsMapTask1.set(this.taskDependices[i].task1, 0)
            
            val = seenObjectsMapTask1.get(this.taskDependices[i].task2);
            if(this.isEmpty(val))
                seenObjectsMapTask2.set(this.taskDependices[i].task2, 0)
            else
                return true
            
            if(dependenciesTaskList.length == 0){
                dependenciesTaskList.push(this.taskDependices[i].task1);
                dependenciesTaskList.push(this.taskDependices[i].task2);
            }else{
                let task1 = dependenciesTaskList[index];
                let task2 = this.taskDependices[i].task1;
                if(task1 == task2){
                    dependenciesTaskList.push(this.taskDependices[i].task2);
                    index += 1;
                }else{
                    dependenciesTaskList.push(',');
                    dependenciesTaskList.push(this.taskDependices[i].task1);
                    dependenciesTaskList.push(this.taskDependices[i].task2);
                    index += 2;
                }                
            }
        }
        this.getDependeciesTaskList().push(dependenciesTaskList);
        return false;        
    }
    
    //check obj is empty or not
    isEmpty(obj){
        if(obj == null || obj == undefined)
            return true;
        else
            return false; 
    }

    // add task in task pool
    addTask(task){
        this.getTaskList().push(task);
    }
   
    // execute task in parallel with sequence
    async executeTask(list){
        await Parallel.each(list, async value => {            
            await Parallel.sleep(10000);            
            this.getResultTaskExecuteList().push(value.name);
        })       
    }

    // sequence execution completed process add in list
    executeProcess(list){
        list.forEach(element => {
            this.getResultTaskExecuteList().push(element.name);
        });

    }

    // reverse the list
    reverse(list){
        let arr = [];
        for(let i = list.length -1; i >= 0; --i){
            arr.push(list[i]);
        }
        return arr;
    }
}