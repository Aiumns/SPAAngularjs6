import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardGuard } from './gaurd/auth-guard.guard';

const routes: Routes = [
{path: 'profile', component: ProfileComponent, canActivate: [AuthGuardGuard]},
{path: 'admin', component: AdminComponent, canActivate: [AuthGuardGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
