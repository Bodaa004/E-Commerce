import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/cart';
  myToken: any = localStorage.getItem('userToken');

  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post(this.apiUrl, { productId: productId });
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  removeSpecificCartItem(productId: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${productId}`);
  }

  updateProductQuantity(productId: string, newCount: number): Observable<any> {
    return this.httpClient.put(
      `${this.apiUrl}/${productId}`,
      { count: newCount },
    );
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}`);
  }
}
