import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Livro } from '../model/livro';
import { Observable } from 'rxjs';

@Injectable()
export class LivroService {

  private url: string = 'http://localhost/biblia-esperanca-real/esperanca-real-api/';
  private noSecureUrl: string = 'not-secure/';
  private secureUrl: string = 'secure/';
  public http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  findLivrosByTestamento(idTestamento: number): Observable<Livro[]> {    
    return this.getMethod(this.url + this.noSecureUrl + "livros/"+ idTestamento);
  }

  findLivroById(id: number): Observable<Livro> {    
    return this.getMethod(this.url + this.noSecureUrl + "livro/"+ id);
  }

  abrirLivro(livro: number, capitulo: number, versao: number): Observable<any> {   
    return this.getMethod(this.url + this.noSecureUrl + "capitulo/" + livro + "/" + capitulo + "/" + versao);
  }

  findAllVersoes(): Observable<any> {
    return this.getMethod(this.url + this.noSecureUrl + "versoes");
  }

  search(palavraChave: string, versao: number): Observable<any> {   
    return this.getMethod(this.url + this.noSecureUrl + "search/" + palavraChave + "/" + versao);
  }
  
  private getMethod<T>(relativePath: string = '', params: any = null) {

    if (params != null) {
      return this.http.get<T>(relativePath, {
        params: params,
        headers: this.getHeaders()
      });
    } else {
      return this.http.get<T>(relativePath, {headers: this.getHeaders()});
    }
  }

  protected getHeaders() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('responseType', 'text');
    headers.set('Access-Control-Allow-Origin', '*');
    return headers;
}

}
