import { Products } from './../../models/products.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products?: Products[];
  currentProducts?: Products;
  currentIndex = -1;
  title = '';

  constructor(private ProductsService: ProductsService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  refreshList(): void {
    this.currentProducts = undefined;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.ProductsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.products = data;
    });
  }

  setActiveTutorial(products: Products, index: number): void {
    this.currentProducts = products;
    this.currentIndex = index;
  }

}
