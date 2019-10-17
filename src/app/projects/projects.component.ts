import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit, OnDestroy {
  @Output() chooseProjectEvent = new EventEmitter<string>();

  itemsRef: AngularFireList<any>;
  projects: Observable<any[]>;
  projectList: any[];
  subscriptionProjects: Subscription;
  db: AngularFireDatabase;

  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;
  tasksList: any[];

  constructor(db: AngularFireDatabase) {
    this.db = db;
    this.itemsRef = db.list('/projects');

    // Use snapshotChanges().map() to store the key
    this.projects = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.subscriptionProjects = this.projects.subscribe(projects => {
      this.projectList = projects;
    }
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionProjects.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.projectList, event.previousIndex, event.currentIndex);
  }

  onClickProject(key: number, projectName: string) {
    this.chooseProjectEvent.emit(key + '|' + projectName);
  }
}
