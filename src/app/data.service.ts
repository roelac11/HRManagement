import { Employee } from './employees.interface';
import { Project } from './projects.interface';
import { Injectable } from '@angular/core';

let PROJECT_DATA: Project[] = [
  {
    id: 1,
    name: 'interns',
    teamSize: 0,
    clientName: 'nobody',
  },
  {
    id: 2,
    name: 'coffee break',
    teamSize: 0,
    clientName: 'balcony',
  },
];

let EMPLOYEE_DATA: Employee[] = [
  {
    id: 1,
    name: 'gwen',
    company: 'parkside',
    birthday: new Date('01.01.1997'),
    favoriteColor: 'yellow',
    projectId: 1,
  },
  {
    id: 2,
    name: 'laura',
    company: 'parkside',
    birthday: new Date('08.07.1997'),
    favoriteColor: 'green',
    projectId: 1,
  },
  {
    id: 3,
    name: 'asdf',
    company: 'parkside',
    birthday: new Date('10.03.1997'),
    favoriteColor: 'red',
  },
];

@Injectable({
  providedIn: 'root',
})
export class DataService {
  nextEmpId = 4;
  nextProId = 3;
  constructor() {}

  getEmployeeData(): Employee[] {
    return EMPLOYEE_DATA;
  }

  getProjectData(): Project[] {
    return PROJECT_DATA;
  }

  addEmployee(newEmployee: Employee) {
    newEmployee.id = this.nextEmpId;
    this.nextEmpId++;
    EMPLOYEE_DATA.push(newEmployee);
  }

  addProject(newProject: Project) {
    newProject.id = this.nextProId;
    this.nextProId++;
    PROJECT_DATA.push(newProject);
  }

  removeEmployee(employee: Employee) {
    EMPLOYEE_DATA = EMPLOYEE_DATA.filter((item) => item.id !== employee.id);
  }

  removeProject(project: Project) {
    PROJECT_DATA = PROJECT_DATA.filter((item) => item.id !== project.id);
    this.updateEmployeeProjects();
  }

  updateEmployee(employee: Employee) {
    EMPLOYEE_DATA = EMPLOYEE_DATA.filter((item) => item.id !== employee.id);
    EMPLOYEE_DATA.push(employee);
    EMPLOYEE_DATA.sort((e1, e2) => (e1.id > e2.id ? 0 : -1));
  }

  updateProject(project: Project) {
    PROJECT_DATA = PROJECT_DATA.filter((item) => item.id !== project.id);
    PROJECT_DATA.push(project);
    PROJECT_DATA.sort((p1, p2) => (p1.id > p2.id ? 0 : -1));
  }

  updateTeamSizes() {
    for (const project of PROJECT_DATA) {
      project.teamSize = 0;
      for (const employee of EMPLOYEE_DATA) {
        if (employee.projectId) {
          if (project.id === employee.projectId) {
            project.teamSize++;
          }
        }
      }
      this.updateProject(project);
    }
  }

  getProjectById(id: number): Project {
    return PROJECT_DATA.filter((item) => item.id === id)[0];
  }

  updateEmployeeProjects() {
    for (const employee of EMPLOYEE_DATA) {
      if (employee.projectId) {
        if (PROJECT_DATA.filter((item) => item.id === employee.projectId).length === 0) {
          employee.projectId = 0;
        }
      }
    }
  }
}
