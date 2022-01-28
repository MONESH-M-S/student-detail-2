import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ShowAdminsComponent } from './admin/admin-home/show-admins/show-admins.component';
import { StudentDetailComponent } from './admin/admin-home/student-detail/student-detail.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { EditDetailComponent } from './student/edit-detail/edit-detail.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 's',
    children: [
      { path: ':id', component: StudentComponent },
      { path: ':id/edit', component: EditDetailComponent },
    ],
  },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminComponent },
      { path: ':name', component: AdminHomeComponent },
      { path: 'show-admins/:id', component: ShowAdminsComponent },
      { path: 's/:id', component: StudentDetailComponent },
    ],
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
