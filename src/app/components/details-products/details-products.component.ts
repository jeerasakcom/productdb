import { ProductsService } from './../../services/products.service';
import { Products } from './../../models/products.model';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-details-products',
  templateUrl: './details-products.component.html',
  styleUrls: ['./details-products.component.css']
})
export class DetailsProductsComponent implements OnInit, OnChanges {

  @Input() products?: Products;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentProducts: Products = {
    product_name: '',
    product_details: '',
    product_price: '',
    product_quantity: ''
  };
  message = '';

  constructor(private ProductsService: ProductsService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentProducts = { ...this.products };
  }

  updateProducts(): void {
    const data = {
      product_name: this.currentProducts.product_name,
      product_details: this.currentProducts.product_details,
      product_price: this.currentProducts.product_price,
      product_quantity: this.currentProducts.product_quantity,
    };

    if (this.currentProducts.id) {
      this.ProductsService.update(this.currentProducts.id, data)
        .then(() => this.message = 'updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteProducts(): void {
    if (this.currentProducts.id) {
      this.ProductsService.delete(this.currentProducts.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
