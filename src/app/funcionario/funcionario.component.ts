import {Component, OnInit, ViewChild} from '@angular/core';
import {Filtro, Funcionario, FuncionarioService} from "./funcionario.service";
import {ConfirmationService, LazyLoadEvent} from "primeng/api";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {finalize} from "rxjs/operators";
import {ErrorHandlerService} from "../error-handler.service";

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit {

  totalRegistros = 0;
  filtro = new Filtro();
  funcionarios: Funcionario[] = [];
  @ViewChild('tabela') tabela!: Table;
  loading!: boolean;

  constructor(
    private funcionarioService: FuncionarioService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.loading = true;
  }

  pesquisar(pagina = 0) {
    this.loading = true;

    this.filtro.page = pagina;

    this.funcionarioService.pesquisar(this.filtro)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {

        this.funcionarios = res.funcionarios;
        this.totalRegistros = res.totalElements;

        if (pagina === 0) {
          this.tabela.first = 0;
        }

      }, error => this.errorHandler.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const first = event.first || 0;
    const rows = event.rows || 1;

    const pagina = first / rows;

    this.pesquisar(pagina);
  }

  limpar() {
    this.filtro = new Filtro();
    this.pesquisar(0);
  }

  editar(funcionario: Funcionario) {
    this.router.navigate(['/funcionarios', funcionario.id])
  }

  confirmarExclusao(funcionario: Funcionario) {
    this.confirmationService.confirm({
      message: 'Deseja excluir o(a) funcionário(a)?',
      accept: () => this.excluir(funcionario)
    });
  }

  excluir(funcionario: any) {
    this.loading = true;

    this.funcionarioService.remover(funcionario.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        () => this.pesquisar(0),
        error =>this.errorHandler.handle(error)
      )
  }
}
