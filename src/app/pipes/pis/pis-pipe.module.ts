import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PisPipe} from "./pis.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [PisPipe],
  exports: [PisPipe]
})
export class PisPipeModule { }
