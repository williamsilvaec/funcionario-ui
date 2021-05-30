import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FuncionarioComponent} from "./funcionario/funcionario.component";
import {FuncionarioCadastroComponent} from "./funcionario-cadastro/funcionario-cadastro.component";

const routes: Routes = [
  { path: '', redirectTo: 'funcionarios', pathMatch: 'full' },
  { path: 'funcionarios', component: FuncionarioComponent },
  { path: 'funcionarios/novo', component: FuncionarioCadastroComponent },
  { path: 'funcionarios/:codigo', component: FuncionarioCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
