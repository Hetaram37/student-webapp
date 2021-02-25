import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '', loadChildren: () => import('./view/components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'user',
    children: [
      {
        path: '', loadChildren: () => import('./view/components/user/user.module').then(m => m.UserModule)
      }
    ],
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
