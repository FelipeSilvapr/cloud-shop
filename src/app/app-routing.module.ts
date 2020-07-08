import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCategoryComponent } from './components/list-category/list-category.component';
import { ListProductComponent } from './components/list-product/list-product.component';


const routes: Routes = [
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  { path: 'categories', component: ListCategoryComponent },
  { path: 'categories/:description', component: ListProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
