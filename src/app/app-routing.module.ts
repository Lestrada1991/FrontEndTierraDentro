import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { adminGuard } from './service/admin.guard';
import { DocumentosComponent } from './pages/documentos/Documentos/documentos.component';
import { DetalleLibrosComponent } from './pages/DetalleLibro/detallelibros.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
  path: 'users',
  children: [
    {
      path: '',
      redirectTo: 'documentos',
      pathMatch: 'full'
    },
    {
      path: 'home',
      redirectTo: 'documentos',
      pathMatch:'full'
    },
    {
      path: 'signup',
      component: SignupComponent,
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent,
      pathMatch: 'full'
    },
    {
      path: 'documentos',
      component:DocumentosComponent,
      pathMatch:'full',
      canActivate: [adminGuard],
    },
  ]},
 /* {
    path: 'home',
    redirectTo: 'documentos',
    pathMatch:'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'documentos',
    component:DocumentosComponent,
    pathMatch:'full',
    canActivate: [adminGuard],
  },*/
];






@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
