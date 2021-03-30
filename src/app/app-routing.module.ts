import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateHomeComponent } from './template-home/template-home.component';

const routes: Routes = [
  {path:"",component:TemplateHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
