import { DataService } from '../data.service';
import { Project } from '../projects.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  displayedProjectColumns: string[] = ['id', 'name', 'teamSize', 'clientName', 'delete', 'edit'];
  projectData: Project[];
  addForm: FormGroup;
  updateForm: FormGroup;
  feedbackMessage = '';
  editing = false;

  constructor(private router: Router, private fb: FormBuilder, private dataService: DataService) {
    this.updateTeamSizes();

    this.addForm = this.fb.group({
      name: ['secondproject', [Validators.required]],
      clientName: ['anybody', [Validators.required]],
    });

    this.updateForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      clientName: ['', [Validators.required]],
    });

    this.loadProjectData();
  }

  ngOnInit() {
    this.updateTeamSizes();
    this.loadProjectData();
    this.feedbackMessage = '';
  }

  addProject() {
    const newProject: Project = {
      id: 0,
      name: this.addForm.get('name').value,
      teamSize: 0,
      clientName: this.addForm.get('clientName').value,
    };

    this.dataService.addProject(newProject);
    this.loadProjectData();

    this.feedbackMessage = 'New project ' + this.addForm.get('name').value + ' added!';
    this.resetInputFields();
  }

  resetInputFields() {
    this.addForm.setValue({ name: '', clientName: '' });
  }

  deleteProject(element: Project) {
    this.dataService.removeProject(element);
    this.loadProjectData();
    this.feedbackMessage = 'Project ' + this.addForm.get('name').value + ' deleted!';
  }

  editProject(element: Project) {
    this.editing = true;
    this.feedbackMessage = '';
    this.updateForm.setValue({
      id: element.id,
      name: element.name,
      clientName: element.clientName,
    });
    this.updateForm.get('id').disable();
  }

  updateProject() {
    const id = this.updateForm.get('id').value;
    const newName = this.updateForm.get('name').value;
    const newClientName = this.updateForm.get('clientName').value;

    const newElement = {
      id,
      name: newName,
      teamSize: 0,
      clientName: newClientName,
    };

    this.dataService.updateProject(newElement);
    this.updateTeamSizes();
    this.loadProjectData();
    this.editing = false;

    this.feedbackMessage = 'Project ' + newElement.name + ' updated!';
  }

  updateTeamSizes() {
    this.dataService.updateTeamSizes();
  }

  loadProjectData() {
    this.projectData = [...this.dataService.getProjectData()];
  }
}
