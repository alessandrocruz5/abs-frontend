import { Router, Routes } from '@angular/router';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthService } from './services/auth.service';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';

const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map((isLoggedIn) => {
      console.log('AuthGuard check - isLoggedIn:', isLoggedIn);
      if (isLoggedIn) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'book-appointment',
    component: BookAppointmentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-appointment/:id',
    component: EditAppointmentComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
