import { NgModule } from '@angular/core';
import { Routes } from "@angular/router/router";
import { CoffeeEditComponent } from '../coffee-edit/coffee-edit.component';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

const coffeesRoutes: Routes = [
  { path: 'product', children: [
    {
      path: 'new',
      component: CoffeeEditComponent
    },
    {
      path: ':id/edit',
      component: CoffeeEditComponent
    },
    {
      path: 'detail/:id',
      component: ProductDetailComponent
    }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(coffeesRoutes)
  ],
  exports: [RouterModule]
})
export class CoffeeRoutingModule {

}
