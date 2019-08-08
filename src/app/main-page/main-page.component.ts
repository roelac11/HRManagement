import { Project } from '../projects.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  opened: boolean;

  constructor(private router: Router) {}

  ngOnInit() {}

  showEmployees() {
    console.log('navigating to employees...');
    this.router.navigateByUrl('employees');
  }

  showProjects() {
    console.log('navigating to projects...');
    this.router.navigateByUrl('projects');
  }

  logout() {
    console.log('loggin out...');
    localStorage.setItem('loggedIn', 'false');
    console.log('mainPageComponent... ' + localStorage.getItem('loggedIn'));
    this.router.navigateByUrl('/login');
  }
}
