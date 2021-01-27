import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeProvider {
  private PATH = 'produtos/';


  constructor(private db:AngularFireDatabase) {}

  getAll(){
    return this.db.list(this.PATH)
    .snapshotChanges()
    .map(changes => {
      return changes.map( c =>({ key: c.key, ...c.payload.val() }));
    })
  }



  get(categorykey:string){
    return this.db.object(this.PATH + categorykey)
    .snapshotChanges()
    .map(c => {
      return { key: c.key, ...c.payload.val() };
    })
  }



  save(treinoData: any){
    const treino = {
      nome:treinoData.nome,

    };
    if(treinoData.key){
      this.db.list(this.PATH).update(treinoData.key, treino);
    }else{
      this.db.list(this.PATH).push(treino)
    }

  }

  remove(key:string){
     this.db.list(this.PATH).remove(key);

  }

}
