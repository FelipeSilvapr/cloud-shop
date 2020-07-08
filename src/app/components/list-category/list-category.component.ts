import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/Category';
import { ProductsService } from '../../services/products.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
 
categories: Category[];

  constructor(private productsService:ProductsService,
              private location: Location,
              private router:Router) { }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(categories => {
    this.categories = categories;
    });
  }

  onSelect(category){
    this.router.navigate(['/categories', category.description]);
  }

  newCategory(){
    this.router.navigate(['add-category']);
  }

  deleteCategory(category){
    this.categories = this.categories.filter(c => c.id !== category.id );
    this.productsService.deleteCategory(category).subscribe();    
  }

  goBack(){
    this.location.back();
  }
}