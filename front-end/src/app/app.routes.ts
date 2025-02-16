import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostShowComponent } from './components/posts/post-show/post-show.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
  {
    path: 'home',
    title: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path: 'post/:id',
    title: 'post',
    component: PostShowComponent
  },
  {
    path: 'register',
    title: 'inscription',
    component: RegisterComponent
  },
  {
    path: 'login',
    title: 'se connecter',
    component: LoginComponent
  }
];
