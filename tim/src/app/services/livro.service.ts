import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from 'app/model/livro';
import { Versao } from 'app/model/versao';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private url: string = 'http://localhost/biblia-esperanca-real/esperanca-real-api/';
  public http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  findLivrosByTestamento(idTestamento: number): Observable<Livro[]> {    
    return this.getMethod(this.url + "livros/"+ idTestamento);
  }

  findLivroById(id: number): Observable<Livro> {    
    return this.getMethod(this.url + "livro/"+ id);
  }

  abrirLivro(livro: number, capitulo: number, versao: number): Observable<any> {   
    return this.getMethod(this.url + "capitulo/" + livro + "/" + capitulo + "/" + versao);
  }

  findAllVersoes(): Observable<any> {
    return this.getMethod(this.url + "versoes");
  }

  findVersaoById(id: number): Observable<Versao> {
    return this.getMethod(this.url + "versao/" + id );
  }

  historico(usuario: number): Observable<any> {
    return this.getMethod(this.url + "historico/" + usuario );
  }

  historicoByLivro(usuario: number, livro: number): Observable<any> {
    return this.getMethod(this.url + "historicoLivro/" + usuario + "/" + livro);
  }

  historicoByLivroCapitulo(usuario: number, livro: number, capitulo: number): Observable<any> {
    return this.getMethod(this.url + "historicoLivroCapitulo/" + usuario + "/" + livro + "/" + capitulo);
  }

  search(palavraChave: string, versao: number): Observable<any> {   
    return this.getMethod(this.url + "search/" + palavraChave + "/" + versao);
  }

  marcarCapitulo(usuario: any, livro: any, capitulo: any, versao: any): Observable<any> {   

    let formData: FormData = new FormData(); 
    formData.append('capitulo', capitulo); 
    formData.append('livro', livro); 
    formData.append('usuario', usuario); 
    formData.append('versao', versao); 

    return this.http.post(this.url + 'marcarCapitulo', formData);
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
