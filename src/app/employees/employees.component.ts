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
    'projectId',
    'delete',
    'edit',
  ];
  addForm: FormGroup;
  updateForm: FormGroup;

  feedbackMessage = '';
  tableUpdated = false;
  selectedProjectId: number;
  editing = false;

  constructor(private fb: FormBuilder, private router: Router, public dataService: DataService) {
    this.updateTeamSizes();
    this.loadEmployeeData();
    this.loadProjectData();

    this.addForm = fb.group({
      name: ['juan', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      company: ['parkside', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      birthday: ['02.02.1997', [Validators.required]],
      favoriteColor: ['black'],
      projectId: [1],
    });

    this.updateForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      company: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      favoriteColor: [''],
      projectId: [0],
    });
  }

  ngOnInit() {
    this.updateTeamSizes();
    this.loadProjectData();
    this.loadEmployeeData();
  }

  addEmployee() {
    const newEmployee: Employee = {
      id: 0,
      name: this.addForm.get('name').value,
      company: this.addForm.get('company').value,
      birthday: new Date(this.addForm.get('birthday').value),
      favoriteColor: this.addForm.get('favoriteColor').value,
      projectId: this.addForm.get('projectId').value,
    };

    this.dataService.addEmployee(newEmployee);

    if (newEmployee.projectId) {
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
      projectId: '',
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

  editEmployee(element: Employee) {
    this.editing = true;

    if (!element.projectId) {
      this.updateForm.setValue({
        id: element.id,
        name: element.name,
        company: element.company,
        favoriteColor: element.favoriteColor,
        projectId: '',
      });
    } else {
      this.updateForm.setValue({
        id: element.id,
        name: element.name,
        company: element.company,
        favoriteColor: element.favoriteColor,
        projectId: element.projectId,
      });
    }

    this.updateForm.get('id').disable();
  }

  updateEmployee() {
    const id = this.updateForm.get('id').value;
    const newName = this.updateForm.get('name').value;
    const newCompany = this.updateForm.get('company').value;
    const newFavoriteColor = this.updateForm.get('favoriteColor').value;
    const newProject = this.updateForm.get('projectId').value;

    const newElement = {
      id,
      name: newName,
      company: newCompany,
      birthday: this.empData.filter((emp) => emp.id === id)[0].birthday,
      favoriteColor: newFavoriteColor,
      projectId: newProject,
    };

    this.dataService.updateEmployee(newElement);
    this.updateTeamSizes();
    this.loadEmployeeData();
    this.loadProjectData();
    this.editing = false;

    this.tableUpdated = true;
    this.feedbackMessage = 'Employee ' + newElement.name + ' updated!';
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

  getProjectById(id: number): Project {
    return this.dataService.getProjectById(id);
  }
}
