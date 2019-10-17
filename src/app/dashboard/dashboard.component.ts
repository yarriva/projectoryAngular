import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  projectName: string;
  currentProjectKey: number;
  homeColor: string = "#FF5252";
  aboutColor: string = "#CCD4DC";
  settingsColor: string = "#CCD4DC";

  constructor(private authService: AuthService) {
    this.projectName = 'Choose Project';
    this.currentProjectKey = 0;
  }

  receiveProjectName($event: string) {
    let key = $event.substring(0, $event.indexOf('|'));
    this.projectName = $event.substring($event.indexOf('|') + 1);
    this.currentProjectKey = +key;
  }

  ngOnInit() { }

  navigate(home: boolean, about: boolean, settings: boolean) {
    this.homeColor = home ? "#FF5252" : "#CCD4DC";
    this.aboutColor = about ? "#FF5252" : "#CCD4DC";
    this.settingsColor = settings ? "#FF5252" : "#CCD4DC";
  }
}
