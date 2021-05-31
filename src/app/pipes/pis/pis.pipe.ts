import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'pis'
})
export class PisPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return '';
    }

    const pisValor = value.replace(/\D/g, '');

    if (pisValor.length !== 11) {
      return value;
    }

    const pisArray = pisValor.match(/^(\d{3})(\d{5})(\d{2})(\d{1})$/);

    if (pisArray && pisArray.length === 5) {
      value = `${pisArray[1]}.${pisArray[2]}.${pisArray[3]}-${pisArray[4]}`;
    }

    return value;
  }

}
