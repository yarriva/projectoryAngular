import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private datepipe: DatePipe) { }

  ngOnInit() {
  }

  addNewProject(name: string){
    const newKey = Date.now();
    let formated_date = this.datepipe.transform(newKey, 'dd.MM.yyyy');
    console.log(formated_date);
    this.db.object('/projects/' + newKey + '/title').set(name);
    this.db.object('/projects/' + newKey + '/date_created').set(formated_date);
    name = '';
  }
}
