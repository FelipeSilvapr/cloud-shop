import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/Category';
import { Product } from '../models/Product'
import { Observable}  from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  categoryUrl:string = 'http://localhost:3000/categories';
  productUrl:string = 'http://localhost:3000/products';

  constructor(private http:HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getProducts(category): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productUrl}?category=${category}`);
  }

  getProduct(id): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}?id=${id}`);
  }
  
  deleteCategory(category: Category): Observable<any>{
    const url = `${this.categoryUrl}/${category.id}`;
    return this.http.delete(url, httpOptions);
  }
 
  deleteProduct(product: Product): Observable<any>{
    const url = `${this.productUrl}/${product.id}`;
    return this.http.delete(url, httpOptions);
  }

  editProduct( product: Product):Observable<any>{
    const url = `${this.productUrl}/${product.id}`;
    return this.http.put(url, product, httpOptions)
  }

  addCategory( category: Category): Observable<Category>{
    return this.http.post<Category>(this.categoryUrl, category, httpOptions)
  }

  addProduct( product: Product): Observable<Product>{
    return this.http.post<Product>(this.productUrl, product, httpOptions)
  }
}
