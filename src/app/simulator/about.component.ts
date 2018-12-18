import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//import { DeviceMenu } from './device-menu.component';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html',
  styleUrls: ['./about.component.scss']
})
export class About implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  goBack(route: string): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void { }

}
