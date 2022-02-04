import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { HomeService } from '../home/home.service';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  constructor(
    private homeService: HomeService,
    private messageService: MessageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.homeService.isLoggedIn) {
      return true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You Should be logged in.',
      });
      return this.router.navigate(['']);
    }
    // return true;
  }
}
