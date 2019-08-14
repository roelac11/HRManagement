import { Project } from '../projects.interface';
import { ProjectsComponent } from '../projects/projects.component';
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
    this.router.navigateByUrl('employees');
  }

  showProjects() {
    this.router.navigateByUrl('projects');
  }

  logout() {
    localStorage.setItem('loggedIn', 'false');
    this.router.navigateByUrl('/login');
  }
}
