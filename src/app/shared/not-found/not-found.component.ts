import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  counter = 3;

  constructor(private router: Router) {}

  ngOnInit() {
    localStorage.setItem('loggedIn', 'false');

    setTimeout(() => {
      this.counter = 2;
    }, 500);

    setTimeout(() => {
      this.counter = 1;
      this.router.navigate(['login']);
    }, 2000);
  }
}
