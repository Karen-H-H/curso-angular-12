import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-details-order',
  template: `
  <div class="container-fluid mt-5 pt-5">
  <h1>Orders Details</h1>
  </div>

  <div class="container">
  <table class="table ">
    <thead>
      <tr>
        <th>ID</th>
        <th>ORDER ID</th>
        <th>DETAILS</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor ="let order of orderData">
      <td>{{order.orderId}}</td>
      <td>{{order.id}}</td>
  
      <td *ngFor="let p of order.details">
      <ul>
      <tr>ID:<li>{{p.productId}}</li></tr>
      <tr>Name:<li>{{p.productName}}</li></tr>
      <tr>Quantity:<li>{{p.quantity}}</li></tr>
      </ul>
      </td>
      </tr>
      
    </tbody>
  </table>
  
</div>`,
  styleUrls: ['./details-order.component.scss']
})
export class DetailsOrderComponent implements OnInit {
  orderData !: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.api.getOrder()
    .subscribe(res =>{
      this.orderData = res;
    })
  }
}
