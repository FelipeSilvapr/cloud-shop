import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';
import { ProductsService } from '../../services/products.service';
import { Location } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories: Category[];
  product: Product;
  topicHasError = true;

  constructor(private productsService:ProductsService,
              private location: Location) { }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(categories => {
      this.categories = categories;
      });
    this.product ={
      id:uuidv4(),
      title:null,
      price:null,
      category:'default',
      description:null
    }
  }

  onSubmit(product){
    this.product = product;
    this.productsService.addProduct(this.product).subscribe(() => this.goBack())
  }

  validateTopic(value) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  goBack(){
    this.location.back();
  }
}
