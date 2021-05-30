import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FuncionarioService} from "../funcionario/funcionario.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-funcionario-cadastro',
  templateUrl: './funcionario-cadastro.component.html',
  styleUrls: ['./funcionario-cadastro.component.scss']
})
export class FuncionarioCadastroComponent implements OnInit {

  formulario = this.fb.group({
    nome: [null, Validators.required],
    sobrenome: [null, Validators.required],
    email: [null, Validators.required],
    pis: [null, Validators.required]
  });

  codigo!: number;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo'];

    if (this.codigo) {
      this.carregarFuncionario(this.codigo);
    }
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
    this.funcionarioService.salvar(this.formulario.value)
      .subscribe((funcionario) => {

        this.messageService.add({severity: 'success', detail: 'Funcionário cadastrado com sucesso'});
        this.router.navigate(['/funcionarios', funcionario.id])

      }, error => console.log('erro', error))
  }

  atualizar() {
    this.funcionarioService.atualizar(this.codigo, this.formulario.value)
      .subscribe((funcionario) => {

        this.messageService.add({severity: 'success', detail: 'Funcionário atualizado com sucesso'});
        this.formulario.patchValue(funcionario);

      }, error => console.log(error));
  }

  carregarFuncionario(codigo: number) {
    this.funcionarioService.buscar(codigo)
      .subscribe(funcionario => {

        this.formulario.patchValue(funcionario);

      }, error => console.log(error));
  }

}
