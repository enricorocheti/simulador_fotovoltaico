import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class Main implements OnInit {

  constructor(private router: Router,  private route: ActivatedRoute) { }

  goTo(target: string): void {
    this.router.navigate(["home",target]);
  }

  ngOnInit(): void { }

 
}
