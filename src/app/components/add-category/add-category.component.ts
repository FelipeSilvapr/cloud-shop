import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/Category';
import { ProductsService } from '../../services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category;

  constructor(private productsService:ProductsService,
              private location: Location) { }

  ngOnInit(): void {
    this.category = {id: null , description: null }
  }

  onSubmit(category){
    this.category= category;    
    this.productsService.addCategory(this.category).subscribe(() => this.goBack())
  }

  goBack(){
    this.location.back();
  }
}

