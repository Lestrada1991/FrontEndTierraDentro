import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { adminGuard } from './service/admin.guard';
import { DocumentosComponent } from './pages/documentos/Documentos/documentos.component';
import { DetalleLibrosComponent } from './pages/DetalleLibro/detallelibros.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'documentos',
    pathMatch: 'full'
    

  },
  {
    path: 'home',
    redirectTo: 'product',
    pathMatch: 'full' 
  },
  {
    path: 'documentos',
    component: DocumentosComponent,
    pathMatch: 'full'
  }
  ,
  {
    path: 'alertas',
    component: DetalleLibrosComponent,
    pathMatch: 'full'
    //canActivate: [adminGuard]
  }

];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
