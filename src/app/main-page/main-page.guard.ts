import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MainPageGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(111);
    console.log(localStorage.getItem('loggedIn'));

    if (localStorage.getItem('loggedIn') === 'true') {
      console.log(222);
      console.log(localStorage.getItem('loggedIn'));
      return true;
    } else {
      console.log(333);
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
