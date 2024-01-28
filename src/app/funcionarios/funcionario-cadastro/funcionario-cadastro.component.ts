import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, Validators} from "@angular/forms";
import {FuncionarioService} from "../funcionario.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorHandlerService} from "../../error-handler.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-funcionario-cadastro',
  templateUrl: './funcionario-cadastro.component.html'
})
export class FuncionarioCadastroComponent implements OnInit {

  formulario = this.fb.group({
    nome: [null, [Validators.required, this.validarTamanhoMinimo(2), this.validarTamanhoMaximo(30)]],
    sobrenome: [null, [Validators.required, this.validarTamanhoMinimo(2), this.validarTamanhoMaximo(50)]],
    email: [null, Validators.email],
    pis: [null, Validators.required]
  });

  loading = false;
  codigo!: number;

  constructor(
    private fb: UntypedFormBuilder,
    private funcionarioService: FuncionarioService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo'];

    if (this.codigo) {
      this.carregarFuncionario(this.codigo);
    }
  }

  validarTamanhoMinimo(valor: number) {
    return (input: UntypedFormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  validarTamanhoMaximo(valor: number) {
    return (input: UntypedFormControl) => {
      return (!input.value || input.value.length <= valor) ? null : { tamanhoMaximo: { tamanho: valor } };
    };
  }

  get editando(): boolean {
    return Boolean(this.codigo);
  }

  salvar() {
    if (this.editando) {
      this.atualizar();
    } else {
      this.cadastrar();
    }
  }

  cadastrar() {
    this.loading = true;

    this.funcionarioService.salvar(this.formulario.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe((funcionario) => {

        this.messageService.add({severity: 'success', detail: 'Funcionário(a) cadastrado(a) com sucesso'});
        this.router.navigate(['/funcionarios', funcionario.id])

      }, error => this.errorHandler.handle(error))
  }

  atualizar() {
    this.loading = true;

    this.funcionarioService.atualizar(this.codigo, this.formulario.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe((funcionario) => {

        this.messageService.add({severity: 'success', detail: 'Funcionário(a) atualizado(a) com sucesso'});
        this.formulario.patchValue(funcionario);

      }, error => this.errorHandler.handle(error));
  }

  carregarFuncionario(codigo: number) {
    this.funcionarioService.buscar(codigo)
      .subscribe(funcionario => {

        this.formulario.patchValue(funcionario);

      }, error => this.errorHandler.handle(error));
  }

}
