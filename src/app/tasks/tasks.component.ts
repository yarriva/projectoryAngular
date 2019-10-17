import { Component, OnInit, ElementRef, Input, SimpleChanges } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {
  @Input() currentProjectKey: number;
  db: AngularFireDatabase;

  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;
  subscriptionTasks: Subscription;
  tasksList: any[];

  constructor(db: AngularFireDatabase, private el: ElementRef) {
    this.db = db;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionTasks.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasksList, event.previousIndex, event.currentIndex);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getTasks(this.currentProjectKey);
  }

  getTasks(key: number) {
    this.tasksRef = this.db.list('/projects/' + key.toString() + '/tasks');

    // Use snapshotChanges().map() to store the key
    this.tasks = this.tasksRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.subscriptionTasks = this.tasks.subscribe(tasks => {
      this.tasksList = tasks;
    })
  }

  onTaskStatusChange(task, event) {
    this.db.object('/projects/' + this.currentProjectKey + '/tasks/' + task.key + '/isDone').set(event.checked);
  }

  toggleSelectTask(task) {
    let myTask = this.el.nativeElement.querySelector("#task" + task.key);
    let isToSelect = myTask.classList.contains('selectedTask') ? false : true;

    let allTasks = this.el.nativeElement.querySelectorAll('.tasks-box');
    allTasks.forEach(element => {
      element.classList.remove('selectedTask');
    });

    isToSelect ? myTask.classList.add('selectedTask') : myTask.classList.remove('selectedTask');
  }
}

