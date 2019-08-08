import { DataService } from '../data.service';
import { Employee } from '../employees.interface';
import { Project } from '../projects.interface';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  empData: Employee[];
  proData: Project[];
  displayedEmployeeColumns: string[] = [
    'id',
    'name',
    'company',
    'age',
    'birthday',
    'favoriteColor',
    'project',
    'delete',
  ];
  addForm: FormGroup;
  feedbackMessage = '';
  tableUpdated = false;
  selectedProjectId: number;

  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService) {
    this.updateTeamSizes();
    this.loadEmployeeData();
    this.loadProjectData();

    this.addForm = fb.group({
      name: ['juan', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      company: ['parkside', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      birthday: ['02.02.1997', [Validators.required]],
      favoriteColor: ['black'],
      project: [this.proData[0]],
    });
  }

  ngOnInit() {}

  addEmployee() {
    const newEmployee: Employee = {
      id: 0,
      name: this.addForm.get('name').value,
      company: this.addForm.get('company').value,
      birthday: new Date(this.addForm.get('birthday').value),
      favoriteColor: this.addForm.get('favoriteColor').value,
      project: this.addForm.get('project').value,
    };

    this.dataService.addEmployee(newEmployee);

    if (newEmployee.project) {
      this.updateTeamSizes();
    }
    this.loadEmployeeData();
    this.loadProjectData();

    this.feedbackMessage = 'New user ' + this.addForm.get('name').value + ' added!';
    this.tableUpdated = true;
    this.resetInputFields();
  }

  resetInputFields() {
    this.addForm.setValue({
      name: '',
      company: '',
      birthday: '',
      favoriteColor: '',
      project: '',
    });
  }

  deleteEmployee(element: Employee) {
    this.dataService.removeEmployee(element);
    this.updateTeamSizes();
    this.loadEmployeeData();
    this.loadProjectData();

    this.tableUpdated = true;
    this.feedbackMessage = 'Employee ' + this.addForm.get('name').value + ' deleted!';
  }

  updateEmployee(element: Employee) {
    this.dataService.updateEmployee(element);
    this.updateTeamSizes();
    this.loadEmployeeData();
    this.loadProjectData();

    this.tableUpdated = true;
    this.feedbackMessage = 'Employee ' + element.name + ' updated!';
  }

  updateTeamSizes() {
    this.dataService.updateTeamSizes();
  }

  loadProjectData() {
    this.proData = [...this.dataService.getProjectData()];
  }

  loadEmployeeData() {
    this.empData = [...this.dataService.getEmployeeData()];
  }

  getAge(birthday: Date): number {
    const timeDiff = Math.abs(Date.now() - birthday.getTime());
    const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    return age;
  }
}
