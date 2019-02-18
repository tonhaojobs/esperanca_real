import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestamentoDTO } from '../model/testamento-dto';
import { LivroDTO } from '../model/livro-dto';
import { VersaoDTO } from '../model/versao-dto';

@Injectable()
export class BibliaService {

  url: string = 'http://localhost/projeto/er/';

  public http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  findAllTestamentos(): Observable<TestamentoDTO[]> {
    return this.getMethod(this.url + "testamentos/");
  }

  findLivroById(id: number): Observable<LivroDTO> {    
    return this.getMethod(this.url + "livro/"+ id);
  }

  findLivrosByTestamento(idTestamento: number): Observable<LivroDTO[]> {    
    return this.getMethod(this.url + "livros/"+ idTestamento);
  }

  findAllVersoes(): Observable<VersaoDTO[]> {
    return this.getMethod(this.url + "versoes/");
  }

  openBook(livro: number, capitulo: number, versao: number): Observable<any> {   
    return this.getMethod(this.url + "capitulo/" + livro + "/" + capitulo + "/" + versao);
  }

  private getMethod<T>(relativePath: string = '', params: any = null) {

    if (params != null) {
      return this.http.get<T>(relativePath, {
        params: params
      });
    } else {
      return this.http.get<T>(relativePath);
    }
  }
}
