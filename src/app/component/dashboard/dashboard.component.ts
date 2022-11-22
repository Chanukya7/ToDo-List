import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[]= [];

  addTaskvalue : string ='';
  editTaskValue : string ='';



  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskvalue = '';

    this.taskObj= new Task();
    this.taskArr= [];
    this.getAllTask();
  }
  getAllTask(){
    this.crudService.getAlltasks().subscribe(res=>{
      this.taskArr = res;

    }, err => {
      alert("Unable to get list of Tasks");

    });
  }
  addTask(){
    this.taskObj.task_name = this.addTaskvalue;

    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskvalue = '';

    },err => {
      alert(err);
    })
  }
  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    }, err=>{
      alert("Failed to update Task");
    })
  }
  deleteTask(etask : Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.ngOnInit();

    },err=>{
      alert("Failed to delete the Task");
    });

  }
  call(etask: Task){
    this.taskObj = etask;
    this.editTaskValue= etask.task_name;
  }

}
function getAllTask() {
  throw new Error('Function not implemented.');
}

