import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { GetComponent } from './components/get/get.component';
import { UpdateComponent } from './components/update/update.component';
import { DeleteComponent } from './components/delete/delete.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full',
  },
  {
    path: 'list', component: ListComponent, pathMatch: 'full'   
  },
  {
    path: 'add', component: AddComponent, pathMatch: 'full'
  },
  {
    path: 'get/:id', component: GetComponent, pathMatch: 'full'
  },
  {
    path: 'update/:id', component: UpdateComponent, pathMatch: 'full'
  },
  {
    path: 'delete/:id', component: DeleteComponent, pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
