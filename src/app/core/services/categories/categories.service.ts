import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // api Logic ---- HTTPClient4

  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }

  getSpecificCategories(id: string): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
  }

  getSubcategoriesByCategoryId(id: string): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }
}
