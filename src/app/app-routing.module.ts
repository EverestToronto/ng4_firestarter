import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { UserLoginComponent } from './ui/user-login/user-login.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
// import { UploadsListComponent } from './uploads/uploads-list/uploads-list.component';
import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';

import { CoreModule } from './core/core.module'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'login', component: UserLoginComponent, },

  // SECURE ROUTES (ADD 'canActivate: [AuthGuard]' )
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },



  { path: 'items', component: ItemsListComponent, canActivate: [AuthGuard]},
  { path: 'uploads', loadChildren: './uploads/shared/upload.module#UploadModule' }
  // { path: 'uploads', component: UploadsListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
