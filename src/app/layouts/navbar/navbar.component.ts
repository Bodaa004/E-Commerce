import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, Injector, input, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  //@Input() isLogin: boolean = true;

  private readonly _AuthService = inject(AuthService)
  private readonly _MyTranslateService = inject(MyTranslateService)
  private readonly translateService = inject(TranslateService)

  logOut():void{
    this._AuthService.logOut()
  }

  isLogin = input<boolean>(true);

  change(lang:string):void{
    this._MyTranslateService.changeLang(lang)
  }

  currentLang(lang:string):boolean{
    return this.translateService.currentLang === lang
  }
}
