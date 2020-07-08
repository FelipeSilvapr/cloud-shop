import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: Product[];
  public category;

  constructor(private productsService:ProductsService,
              private route:ActivatedRoute,
              private router:Router,
              private location: Location) { }

  ngOnInit(): void {
    let description = this.route.snapshot.paramMap.get('description');    
    this.category = description;
    this.productsService.getProducts(this.category).subscribe(products => {
    this.products = products;
        });    
  }

  onSelect(product){
    this.router.navigate(['/products', product.id]);
  }

  newProduct(){
    this.router.navigate(['addProduct']);
  }

  deleteProduct(product){
    this.products = this.products.filter(p => p.id !== product.id );
    this.productsService.deleteProduct(product).subscribe();
  }

  goBack(){
    this.location.back();
  }
}