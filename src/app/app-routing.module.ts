import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ShowAdminsComponent } from './admin/admin-home/show-admins/show-admins.component';
import { ShowAllMarksComponent } from './admin/admin-home/show-all-marks/show-all-marks.component';
import { MarkSplitupComponent } from './admin/admin-home/student-detail/mark-splitup/mark-splitup.component';
import { StudentDetailComponent } from './admin/admin-home/student-detail/student-detail.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { ActivityComponent } from './student/activity/activity.component';
import { ClubComponent } from './student/activity/club/club.component';
import { GateComponent } from './student/activity/gate/gate.component';
import { InternComponent } from './student/activity/intern/intern.component';
import { NccComponent } from './student/activity/ncc/ncc.component';
import { OtherComponent } from './student/activity/other/other.component';
import { PaperComponent } from './student/activity/paper/paper.component';
import { PlacementComponent } from './student/activity/placement/placement.component';
import { ProjectComponent } from './student/activity/project/project.component';
import { SportsComponent } from './student/activity/sports/sports.component';
import { VacComponent } from './student/activity/vac/vac.component';
import { EditDetailComponent } from './student/edit-detail/edit-detail.component';
import { StudentComponent } from './student/student.component';
import { ViewActivityComponent } from './student/view-activity/view-activity.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 's',
    children: [
      { path: ':id', component: StudentComponent },
      { path: ':id/edit', component: EditDetailComponent },
      { path: ':id/upload', component: ActivityComponent },
      { path: ':id/paper', component: PaperComponent },
      { path: ':id/project', component: ProjectComponent },
      { path: ':id/club', component: ClubComponent },
      { path: ':id/vac', component: VacComponent },
      { path: ':id/gate', component: GateComponent },
      { path: ':id/sports', component: SportsComponent },
      { path: ':id/intern', component: InternComponent },
      { path: ':id/placement', component: PlacementComponent },
      { path: ':id/ncc', component: NccComponent },
      { path: ':id/other', component: OtherComponent },
      { path: ':id/a/:aid', component: ViewActivityComponent },
    ],
  },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminComponent },
      { path: ':name', component: AdminHomeComponent },
      { path: 'show-admins/:id', component: ShowAdminsComponent },
      { path: 'show-marks/:id', component: ShowAllMarksComponent },
      { path: 's/view/:aid', component: ViewActivityComponent },
      { path: 's/:id', component: StudentDetailComponent },
      { path: 's/mark-splitup/:id', component: MarkSplitupComponent },
    ],
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
