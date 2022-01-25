import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'student',
    children: [{ path: ':id', component: StudentComponent }],
  },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
