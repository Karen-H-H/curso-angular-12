import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksDashboardComponent } from './pages/books-dashboard/books-dashboard.component';
import { DetailsOrderComponent } from './pages/details-order/details-order.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
  },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  {path:'books-dashboard',component:BooksDashboardComponent},
  {path:'details-order',component:DetailsOrderComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
