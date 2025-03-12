import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        console.log('Cart Items:', this.cartDetails);
      },
      error: (err) => console.error('Error fetching cart:', err),
    });
  }

  removeProduct(productId: string): void {
    this.cartService.removeSpecificCartItem(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
      },
      error: (err) => console.error('Error removing product:', err),
    });
  }

  updateProduct(productId: string, newCount: number): void {
    this.cartService.updateProductQuantity(productId, newCount).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
      },
      error: (err) => console.error('Error updating product:', err),
    });
  }


  clearItems():void{
    this.cartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res)
        if (res.message == 'success') {
          this.cartDetails = {} as ICart
          
        }
      },error:(err)=>{
        console.log(err)
      }
    })
  }

}
