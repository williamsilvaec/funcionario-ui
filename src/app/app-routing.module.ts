import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FuncionariosPesquisaComponent} from "./funcionarios/funcionarios-pesquisa/funcionarios-pesquisa.component";
import {FuncionarioCadastroComponent} from "./funcionarios/funcionario-cadastro/funcionario-cadastro.component";
import {PaginaNaoEncontradaComponent} from "./pagina-nao-encontrada/pagina-nao-encontrada.component";

const routes: Routes = [
  { path: '', redirectTo: 'funcionarios', pathMatch: 'full' },
  { path: 'funcionarios', component: FuncionariosPesquisaComponent },
  { path: 'funcionarios/novo', component: FuncionarioCadastroComponent },
  { path: 'funcionarios/:codigo', component: FuncionarioCadastroComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
