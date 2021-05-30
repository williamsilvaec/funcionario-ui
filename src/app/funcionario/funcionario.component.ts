import {Component, OnInit, ViewChild} from '@angular/core';
import {Filtro, Funcionario, FuncionarioService} from "./funcionario.service";
import {ConfirmationService, LazyLoadEvent} from "primeng/api";
import {Router} from "@angular/router";
import {Table} from "primeng/table";

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

  constructor(
    private funcionarioService: FuncionarioService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  pesquisar(pagina = 0) {
    this.filtro.page = pagina;

    this.funcionarioService.pesquisar(this.filtro)
      .subscribe(res => {

        this.funcionarios = res.funcionarios;
        this.totalRegistros = res.totalElements;

        if (pagina === 0) {
          this.tabela.first = 0;
        }

      }, error => console.log('error'));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const first = event.first || 0;
    const rows = event.rows || 0;

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
      message: 'Deseja excluir o funcionário?',
      accept: () => this.excluir(funcionario)
    });
  }

  excluir(funcionario: any) {
    this.funcionarioService.remover(funcionario.id)
      .subscribe(
        () => this.pesquisar(0),
        error => console.log(error)
      )
  }
}
