import { Component, OnInit } from '@angular/core';
import { IdentityStorage } from 'app/_models/identity-storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'app/_services/authentication.service';
import { LivroService } from 'app/services/livro.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  nomeUsuario: string;
  public views: Array<string> = ['Teste'];
  private senha: string;
  private novaSenha: string;
  private novaSenhaConfirmacao: string;
  private leituraList: Array<any>;

  constructor(private idStorage: IdentityStorage, public router: Router, private toastr: ToastrService, private authSevice: AuthenticationService, private livroService: LivroService) { }

  ngOnInit() {
    this.nomeUsuario = this.idStorage.getIdentity()['nome'];
    this.carregaHistoricoLeitura();
  }

  page = 1;
  pageSize = 5;
  collectionSize = COUNTRIES.length;

  get countries(): Country[] {
    return COUNTRIES
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  logout() {
    this.idStorage.clearAuthData();
    localStorage.removeItem('currentUser');
    this.router.navigate(["public"]);
  }

  carregaHistoricoLeitura() {
    let usuario = this.idStorage.getIdentityPromise()['id'];

    if(usuario) {
      this.leituraList = new Array<any>();
      this.livroService.historicoByData(usuario).subscribe(retorno => {
        this.leituraList.push(...retorno);
      });
      console.log(this.leituraList);
      
    }
  }

  alterarSenha(): void {

    if(this.validarFormulario()) {
      let usuario = this.idStorage.getIdentityPromise()['id'];

      this.authSevice.alterarSenha(usuario, this.senha, this.novaSenha).subscribe(result =>{
        console.log(result);
        
        if(result != null) {
          if(result) {
            this.toastr.success('Senha alterada com sucesso', '');
          } else {
            this.toastr.warning('A nova senha deve ser diferente da senha atual', '');
          }
        } else {
          this.toastr.warning('A senha atual informada está incorreta', '');
        }
      });
    }
  }

  validarFormulario(): boolean {

    let validaPreenchimento: boolean = true;
    this.toastr.clear();
    
    if(!this.novaSenhaConfirmacao || this.novaSenhaConfirmacao.trim().length === 0){
      this.toastr.warning('Campo \'Repetir Nova Senha\' Obrigatório', '');
      validaPreenchimento = false;
    }
    
    if(!this.novaSenha || this.novaSenha.trim().length === 0){
      this.toastr.warning('Campo \'Nova Senha\' Obrigatório', '');
      validaPreenchimento = false;
    }
  
    if(!this.senha || this.senha.trim().length === 0){
      this.toastr.warning('Campo \'Senha Atual\' Obrigatório', '');
      validaPreenchimento = false;
    } 
    
    if((this.senha && this.senha.trim().length > 0) && (this.novaSenha && this.novaSenha.trim().length > 0) && (this.novaSenhaConfirmacao && this.novaSenhaConfirmacao.trim().length > 0)) {
      if(this.novaSenha !== this.novaSenhaConfirmacao) {
        this.toastr.warning('As senhas são diferentes', '');
        validaPreenchimento = false;
      }
    }

    return validaPreenchimento;
  }
}





interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'France',
    flag: 'c/c3/Flag_of_France.svg',
    area: 640679,
    population: 64979548
  },
  {
    name: 'Germany',
    flag: 'b/ba/Flag_of_Germany.svg',
    area: 357114,
    population: 82114224
  },
  {
    name: 'Portugal',
    flag: '5/5c/Flag_of_Portugal.svg',
    area: 92090,
    population: 10329506
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'Vietnam',
    flag: '2/21/Flag_of_Vietnam.svg',
    area: 331212,
    population: 95540800
  },
  {
    name: 'Brazil',
    flag: '0/05/Flag_of_Brazil.svg',
    area: 8515767,
    population: 209288278
  },
  {
    name: 'Mexico',
    flag: 'f/fc/Flag_of_Mexico.svg',
    area: 1964375,
    population: 129163276
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'India',
    flag: '4/41/Flag_of_India.svg',
    area: 3287263,
    population: 1324171354
  },
  {
    name: 'Indonesia',
    flag: '9/9f/Flag_of_Indonesia.svg',
    area: 1910931,
    population: 263991379
  },
  {
    name: 'Tuvalu',
    flag: '3/38/Flag_of_Tuvalu.svg',
    area: 26,
    population: 11097
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];
