import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livro } from '../model/livro';
import { Observable } from 'rxjs';

@Injectable()
export class LivroService {

  private url: string = 'http://localhost/esperanca-real-api/';
  private secureUrl: string = 'secure/';
  private publicUrl: string = 'public/';
  public http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  findLivrosByTestamento(idTestamento: number): Observable<Livro[]> {    
    return this.getMethod(this.url + this.publicUrl + "livros/"+ idTestamento);
  }

  findLivroById(id: number): Observable<Livro> {    
    return this.getMethod(this.url + this.publicUrl + "livro/"+ id);
  }

  abrirLivro(livro: number, capitulo: number, versao: number): Observable<any> {   
    return this.getMethod(this.url + this.publicUrl + "capitulo/" + livro + "/" + capitulo + "/" + versao);
  }

  findAllVersoes(): Observable<any> {
    return this.getMethod(this.url + this.publicUrl + "versoes");
  }

  search(palavraChave: string, versao: number): Observable<any> {   
    return this.getMethod(this.url + this.publicUrl + "search/" + palavraChave + "/" + versao);
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
