import {
  Component,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { ISubCategories } from '../../shared/interfaces/isub-categories';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  categories: WritableSignal<ICategories[]> = signal([]);
  subcategories: WritableSignal<ISubCategories[]> = signal([]);
  selectedCategoryName = signal('');

  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
        console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onCategoryClick(category: any): void {
    this.selectedCategoryName.set(category.name);
    this.categoriesService
      .getSubcategoriesByCategoryId(category._id)
      .subscribe({
        next: (res) => {
          this.subcategories.set(res.data);
          console.log("Subbbbb",this.subcategories);
        },
      });
  }
}
