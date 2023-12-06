import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentosComponent } from './Documentos/documentos.component';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from 'src/app/service/admin.guard';

console.log("llego al module de documentos")
const routes: Routes = [

  {
    path: '',
    redirectTo: 'documentos',
    pathMatch:'full'
    
  },
  {path:'documentos',
  component: DocumentosComponent,
  canActivate:[adminGuard]
}
];
console.log("llego al module de documentos")
@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class DocumentosModule { }