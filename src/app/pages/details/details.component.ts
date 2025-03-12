import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);

  detailsProduct: IProduct | null = null;
  selectedImage: string = '';
  imageLoaded: boolean = false;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get('id');
        console.log('Product ID:', idProduct);

        this._ProductsService.getSpecificProducts(idProduct).subscribe({
          next: (res) => {
            console.log(res.data);
            this.detailsProduct = res.data;
            this.selectedImage = res.data.imageCover;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }

  changeImage(image: string): void {
    this.imageLoaded = false;
    setTimeout(() => {
      this.selectedImage = image;
    }, 100); // Delay to trigger opacity transition
  }
}
