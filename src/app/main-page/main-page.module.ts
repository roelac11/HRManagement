import { MainPageComponent } from './main-page.component';
import { MainPageGuard } from './main-page.guard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [MainPageGuard],
    children: [
      {
        path: 'main',
        loadChildren: () => import('../start/start.module').then((mod) => mod.StartModule),
      },
      {
        path: 'projects',
        loadChildren: () => import('../projects/projects.module').then((mod) => mod.ProjectsModule),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('../employees/employees.module').then((mod) => mod.EmployeesModule),
      },
    ],
  },
];

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
  exports: [MainPageComponent],
})
export class MainPageModule {}
