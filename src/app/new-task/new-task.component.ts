import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  @Input() currentProjectKey: number;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  addNewTask(description: string){
    this.db.object('/projects/' + this.currentProjectKey + '/tasks/' + Date.now() + '/task').set(description);
    description = '';
  }
}
