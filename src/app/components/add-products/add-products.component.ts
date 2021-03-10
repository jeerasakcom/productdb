import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { Products } from './../../models/products.model';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  Products: Products = new Products();
  submitted = false;

  constructor(private ProductsService: ProductsService) { }

  ngOnInit(): void {
  }

  saveProducts(): void {
    this.ProductsService.create(this.Products).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newProducts(): void {
    this.submitted = false;
    this.Products = new Products();
  }

}
