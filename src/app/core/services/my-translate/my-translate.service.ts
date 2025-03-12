import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private renderer2:Renderer2;
  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: RendererFactory2
  ) {
    this.renderer2 = renderer.createRenderer(null,null)
    if (isPlatformBrowser(this.platformId)) {
      // logic translate

      //1- set Default Lang
      this.translateService.setDefaultLang('en');

      //2- get Lang Local --save
      const savedLang = localStorage.getItem('lang');

      //3- use Lang Local
      if (savedLang) {
        this.translateService.use(savedLang!);
      }

      this.changeDirection()
    }
  }

  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (localStorage.getItem('lang') === 'ar') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }


  changeLang(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
    this.translateService.use(lang);
    this.changeDirection()

  }

}
