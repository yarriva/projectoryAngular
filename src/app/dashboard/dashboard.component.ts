import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  addNewTaskVisible: boolean;
  addNewProjectVisible: boolean;
  projectName: string;
  currentProjectKey: number;
  redColor = "#FF5252";
  whiteColor = "#CCD4DC";

  homeColor: string = this.redColor;
  aboutColor: string = this.whiteColor;
  settingsColor: string = this.whiteColor;

  constructor(private authService: AuthService) {
    this.projectName = 'Choose Project';
    this.currentProjectKey = 0;
    this.addNewTaskVisible = false;
    this.addNewProjectVisible = false;
  }

  receiveProjectName($event: string) {
    let key = $event.substring(0, $event.indexOf('|'));
    this.projectName = $event.substring($event.indexOf('|') + 1);
    this.currentProjectKey = +key;
  }

  ngOnInit() { }

  navigate(home: boolean, about: boolean, settings: boolean) {
    this.homeColor = home ? this.redColor : this.whiteColor;
    this.aboutColor = about ? this.redColor : this.whiteColor;
    this.settingsColor = settings ? this.redColor : this.whiteColor;
  }

  addNewTask(){
    this.addNewTaskVisible = !this.addNewTaskVisible;
  }

  addNewProject(){
    this.addNewProjectVisible = !this.addNewProjectVisible;
  }
}
