import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FuncionariosPesquisaComponent } from './funcionarios/funcionarios-pesquisa/funcionarios-pesquisa.component';
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FuncionarioCadastroComponent } from './funcionarios/funcionario-cadastro/funcionario-cadastro.component';
import { FloatButtonComponent } from './float-button/float-button.component';
import {MessageModule} from "primeng/message";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputMaskModule} from "primeng/inputmask";
import { MessageErrorComponent } from './message-error/message-error.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from 'ngx-loading';
import {PisPipeModule} from "./pipes/pis/pis-pipe.module";
import {TooltipModule} from "primeng/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    FuncionariosPesquisaComponent,
    FuncionarioCadastroComponent,
    FloatButtonComponent,
    MessageErrorComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true,
      animationType: ngxLoadingAnimationTypes.circle,
      primaryColour: '#4baaf5',
      secondaryColour: '#cae6fc',
    }),
    PisPipeModule,

    TableModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    RippleModule,
    MessageModule,
    InputMaskModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
