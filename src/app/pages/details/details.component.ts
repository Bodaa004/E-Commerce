import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

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

  addToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
          this._CartService.cartNumber.set(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
