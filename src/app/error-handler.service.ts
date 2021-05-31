import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MessageService} from 'primeng/api';

@Injectable({providedIn: 'root'})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 500) {
      msg = 'Ocorreu um erro ao processar a sua solicitação';
      const errors = errorResponse.error.objects;

      if (errors) {
        msg = '';

        for (let i = 0; i < errors.length; i++) {
          if (i === errors.length - 1) {
            msg += errors[i].userMessage;
          } else {
            msg += errors[i].userMessage + ', ';
          }
        }

      } else {
        try {
          msg = errorResponse.error.userMessage;
        } catch (e) { }

      }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.clear();
    this.messageService.add({severity: 'error', detail: msg, life: 4000});
  }

}
