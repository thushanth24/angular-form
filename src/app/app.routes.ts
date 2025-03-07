import { Routes } from '@angular/router';
import { StudentRegistrationComponent } from './components/form/form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'student-registration', pathMatch: 'full' }, // Correct redirect
  { path: 'student-registration', component: StudentRegistrationComponent }, // Correct path

  { path: '**', redirectTo: 'student-registration' } // Redirect unknown paths
];
