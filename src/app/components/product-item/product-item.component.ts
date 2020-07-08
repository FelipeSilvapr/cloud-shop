import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  categories: Category[];
  product: Product;
  public id;
  topicHasError = false;

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    let id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.productsService.getProduct(this.id).subscribe(products => {
      this.product = products[0];
    });
  }

  onSubmit(product) {
    this.productsService.editProduct(product).subscribe(() => this.goBack());
  }

  validateTopic(value) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  goBack() {
    this.location.back();
  }
}
