import { Component, OnInit, OnDestroy, Output, EventEmitter, ElementRef, Input } from '@angular/core';
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
  @Input() addNewProjectVisible: boolean;

  itemsRef: AngularFireList<any>;
  projects: Observable<any[]>;
  projectList: any[];
  subscriptionProjects: Subscription;
  db: AngularFireDatabase;

  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;
  tasksList: any[];

  constructor(db: AngularFireDatabase, private el: ElementRef) {
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
    this.toggleSelectProject(key);
  }

  toggleSelectProject(key: number) {
    let myTask = this.el.nativeElement.querySelector("#project" + key);
    let isToSelect = myTask.classList.contains('selectedProject') ? false : true;

    this.deselectProject();
    this.hideAllSvg();
    this.showAllDates();

    if (isToSelect) {
      myTask.classList.add('selectedProject');
      const elements = Array.from(myTask.getElementsByClassName('svgDeleteProject'));
      for (const x of elements) {
        const y = <HTMLElement>x;
        y.style.display = '';
      }
      const dateDiv = <HTMLElement>myTask.getElementsByClassName('date')[0];
      dateDiv.style.display = 'none';
    } else {
      myTask.classList.remove('selectedProject');
    }
  }

  private deselectProject() {
    let allTasks = this.el.nativeElement.querySelectorAll('.projects-box');
    allTasks.forEach(element => {
      element.classList.remove('selectedProject');
    });
  }

  private hideAllSvg() {
    const elements = Array.from(document.getElementsByClassName('svgDeleteProject'));
    for (const x of elements) {
      const y = <HTMLElement>x;
      y.style.display = 'none';
    }
  }

  showAllDates() {
    const elements = Array.from(document.getElementsByClassName('date'));
    for (const x of elements) {
      const y = <HTMLElement>x;
      y.style.display = '';
    }
  }

  deleteProject(project) {
    if (confirm("Are you sure to delete?")) {
      this.db.object('/projects/' + project.key).remove();
    }
  }
}
