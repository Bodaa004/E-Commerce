import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart/cart.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { SalePipe } from '../../shared/pipes/sale.pipe';
import { TermtextPipe } from '../../shared/pipes/termtext.pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    CarouselModule,
    RouterLink,
    UpperCasePipe,
    CurrencyPipe,
    SalePipe,
    TermtextPipe,
    SearchPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly productService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  allProducts: WritableSignal<IProduct[]> = signal([]);
  products: WritableSignal<IProduct[]> = signal([]);
  text: string = '';
  currentPage = signal(1);
  itemsPerPage = 16;

  pageNumbers = computed(() => {
    const filtered = this.allProducts().filter(product =>
      product.title.toLowerCase().includes(this.text.toLowerCase())
    );
    return Array.from({ length: Math.ceil(filtered.length / this.itemsPerPage) }, (_, i) => i + 1);
  });
  


  constructor() {
    effect(() => {
      this.updatePaginatedProducts();
    });
  }



  ngOnInit(): void {
    this.getProductsData();
  }

  updatePaginatedProducts(): void {
    const allProducts = this.allProducts();
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.products.set(allProducts.slice(start, end));
  }
  
  changePage(page: number): void {
    this.currentPage.set(page);
    this.updatePaginatedProducts();

  }

  getProductsData() {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
        console.log(this.allProducts);
        this.updatePaginatedProducts(); 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
          this.cartService.cartNumber.set(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
