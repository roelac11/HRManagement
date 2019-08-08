import { StartComponent } from './start.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild([{ path: '', component: StartComponent }]),
  ],
  exports: [StartComponent],
})
export class StartModule {}
