
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar class="main-header" color="warn">
    <a [routerLink]="['/']">Book Store</a>
    <a [routerLink]="['books-dashboard']">Dashboard</a>
    <a [routerLink]="['details-order']">Orders</a>
    <app-cart class="shopping-cart" (click)="goToCheckout()"></app-cart>
  </mat-toolbar>`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) { }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
