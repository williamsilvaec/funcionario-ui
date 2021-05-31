import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export class Filtro {

  constructor(
    public pis?: string,
    public nome?: string,
    public sobrenome?: string,
    public page = 0,
    public size = 5
  ) { }

}

export interface Funcionario {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  pis: string;
  dataCadastro: Date;
}

export interface FuncionarioInput {
  nome: string;
  sobrenome: string;
  email: string;
  pis: string;
}

export interface FuncionarioPage {
  funcionarios: Funcionario[];
  totalElements: number;
}

@Injectable({providedIn: 'root'})
export class FuncionarioService {

  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = `${environment.api}/funcionarios`;
  }

  pesquisar(filtro: Filtro): Observable<FuncionarioPage> {
    let params = new HttpParams()
      .set('page', filtro.page.toString())
      .set('size', filtro.size.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome.toString());
    }

    if (filtro.sobrenome) {
      params = params.set('sobrenome', filtro.sobrenome.toString());
    }

    if (filtro.pis) {
      const pis = this.removerFormatacaoPIS(filtro.pis);
      params = params.set('pis', pis);
    }

    return this.httpClient.get(this.url, {params})
      .pipe(map((page: any) => {

        return {
          funcionarios: page.content,
          totalElements: page.totalElements
        }

      }));
  }

  salvar(funcionario: FuncionarioInput): Observable<Funcionario> {
    funcionario.pis = this.removerFormatacaoPIS(funcionario.pis);
    return this.httpClient.post<Funcionario>(this.url, funcionario);
  }

  atualizar(funcionarioId: number, funcionario: FuncionarioInput): Observable<Funcionario> {
    funcionario.pis = this.removerFormatacaoPIS(funcionario.pis);
    return this.httpClient.put<Funcionario>(`${this.url}/${funcionarioId}`, funcionario);
  }

  buscar(codigo: number): Observable<any> {
    return this.httpClient.get(`${this.url}/${codigo}`);
  }

  remover(codigo: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${codigo}`);
  }

  private removerFormatacaoPIS(pis: string): string {
    if (!pis) {
      return '';
    }

    return pis.replace(/\D/g, '');
  }

}
