import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private title: Title,
    private primengConfig: PrimeNGConfig
  ) {
    this.title.setTitle('Funcionários | Web');
    this.primengConfig.ripple = true;
  }
}
