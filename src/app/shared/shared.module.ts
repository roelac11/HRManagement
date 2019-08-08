import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule],
  exports: [NotFoundComponent],
})
export class SharedModule {}
