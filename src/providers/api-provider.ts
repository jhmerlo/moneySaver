import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';


@Injectable()
export class ApiProvider {

    constructor(public db: AngularFireDatabase) {

    }

    save(usuario: any){
        this.db.list('usuarios')
        .push(usuario)
        .then(r=> console.log(r));
    }

}