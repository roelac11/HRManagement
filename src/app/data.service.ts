import { Employee } from './employees.interface';
import { Project } from './projects.interface';
import { Injectable } from '@angular/core';

let projectData: Project[] = [
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

let employeeData: Employee[] = [
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
    projectId: 0,
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
    return employeeData;
  }

  getProjectData(): Project[] {
    return projectData;
  }

  addEmployee(newEmployee: Employee) {
    newEmployee.id = this.nextEmpId;
    this.nextEmpId++;
    employeeData.push(newEmployee);
  }

  addProject(newProject: Project) {
    newProject.id = this.nextProId;
    this.nextProId++;
    projectData.push(newProject);
  }

  removeEmployee(employee: Employee) {
    employeeData = employeeData.filter((item) => item.id !== employee.id);
  }

  removeProject(project: Project) {
    projectData = projectData.filter((item) => item.id !== project.id);
    this.updateEmployeeProjects();
  }

  updateEmployee(employee: Employee) {
    employeeData = employeeData.filter((item) => item.id !== employee.id);
    employeeData.push(employee);
    employeeData.sort((e1, e2) => (e1.id > e2.id ? 0 : -1));
  }

  updateProject(project: Project) {
    projectData = projectData.filter((item) => item.id !== project.id);
    projectData.push(project);
    projectData.sort((p1, p2) => (p1.id > p2.id ? 0 : -1));
  }

  updateTeamSizes() {
    for (const project of projectData) {
      project.teamSize = 0;
      for (const employee of employeeData) {
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
    return projectData.filter((item) => item.id === id)[0];
  }

  updateEmployeeProjects() {
    for (const employee of employeeData) {
      if (employee.projectId) {
        if (projectData.filter((item) => item.id === employee.projectId).length === 0) {
          employee.projectId = 0;
        }
      }
    }
  }
}
