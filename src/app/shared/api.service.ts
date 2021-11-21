import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURl = 'http://localhost:3000/products';
  private apiURlOrder = 'http://localhost:3000/detailsOrders';
  
  constructor(private http: HttpClient) { }
  
  postBook(data: any){
    return this.http.post<any>(this.apiURl, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getBook(){
    return this.http.get<any>(this.apiURl)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateBook(data: any, id:number){
    return this.http.put<any>(`${this.apiURl}/${id}`, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteBook(id : number){
    return this.http.delete<any>(`${this.apiURl}/${id}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getOrder(){
    return this.http.get<any>(this.apiURlOrder)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
