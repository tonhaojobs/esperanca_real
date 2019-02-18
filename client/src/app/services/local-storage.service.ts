import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class LocalStorageService {

  biblia: Biblia;
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.storage.set('CURRENT_VERSION', 1);
  }

  alterarVersao(versao: number) {
    this.storage.set('CURRENT_VERSION', versao);
  }
}

export class Biblia {
  versao: number;
}