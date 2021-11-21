import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { Product } from '../products/interfaces/product.interface';
import { BookModel } from './book.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';



@Component({
  selector: 'app-books-dashboard',
  template:  `
  <div class="container-fluid mt-5 pt-5">
      <h1>Add, Edit or Delete a Book</h1>
      <div class="d-flex justify-content-end">
          <button type="button" (click)="clickAddBook()" class="btn btn-success mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Book</button>
      </div>
  </div>
  
  <div class="container">
      <table class="table mt-3">
          <thead class="fs-6">
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col" width="60%" class="text-center">Description</th>
        
              <th scope="col" class="text-center">Action</th>
          </thead>
          <tbody>
              <tr *ngFor ="let book of bookData" >
                  <td>{{book.id}}</td>
                  <td>{{book.name}}</td>
                  <td>{{book.price}}</td>
                  <td>{{book.description}}</td>
                  
                  <td>
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" (click)="onEdit(book)" data-bs-target="#exampleModal">Edit</button>
                      <button class="btn btn-danger mx-3" (click)="deleteBooks(book)">Delete</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
  
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Book Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form [formGroup]="formValue">
              <div class="mb-3">
                <label for="BookName" class="form-label">Name</label>
                <input type="text" class="form-control" formControlName="name">
              </div>
              <div class="mb-3">
                <label for="BookPrice" class="form-label">Price</label>
                <input type="text" class="form-control" formControlName="price">
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input type="text" class="form-control" formControlName="description">
              </div>
    
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" id="cancel" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" *ngIf="showAdd" (click)="postBookDetails()" class="btn btn-primary">Add</button>
            <button type="button" *ngIf="showUpdate" (click)="updateBookDetails()" class="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    </div>
`,
  styleUrls: ['./books-dashboard.component.scss']
})
export class BooksDashboardComponent implements OnInit {

  formValue !: FormGroup;
  bookModelObj : BookModel = new BookModel;
  bookData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder : FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group(
      {
        name : [''],
        price : [''],
        description : [''],
        stock : ['']
      }
    )
    this.getAllBooks();
  }
  clickAddBook(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postBookDetails(){
    this.bookModelObj.name = this.formValue.value.name;
    this.bookModelObj.price = this.formValue.value.price;
    this.bookModelObj.description = this.formValue.value.description;
    this.bookModelObj.stock = this.formValue.value.stock;

    this.api.postBook(this.bookModelObj)
    .subscribe(res =>{
      alert("Book added successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllBooks();
    },
    err =>{
      alert("Something went wrong")
    }
    )
  }

  getAllBooks(){
    this.api.getBook()
    .subscribe(res =>{
      this.bookData = res;
    })
  }

 deleteBooks(book : any){
   this.api.deleteBook(book.id)
   .subscribe(res =>{
     alert("Book deleted");
     this.getAllBooks();
   })
 }

 onEdit(book : any){
   this.showAdd = false;
   this.showUpdate = true;
   this.bookModelObj.id = book.id;
   this.formValue.controls['name'].setValue(book.name),
   this.formValue.controls['price'].setValue(book.price),
   this.formValue.controls['description'].setValue(book.description),
   this.formValue.controls['stock'].setValue(book.stock)
 }

 updateBookDetails(){
  this.bookModelObj.name = this.formValue.value.name;
  this.bookModelObj.price = this.formValue.value.price;
  this.bookModelObj.description = this.formValue.value.description;
  this.bookModelObj.stock = this.formValue.value.stock;

  this.api.updateBook(this.bookModelObj, this.bookModelObj.id)
  .subscribe(res =>{
    alert("Updated successfully");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllBooks();
  })
 }
}
