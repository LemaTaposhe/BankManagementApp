//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-root',
//  templateUrl: './root.component.html',
//  styleUrls: ['./root.component.css']
//})
//export class RootComponent {

//}
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  constructor(private routes: Router) { }

  ngOnInit() {
  }

  UseCore() {
    this.routes.navigate(['/home']);
  }


}
