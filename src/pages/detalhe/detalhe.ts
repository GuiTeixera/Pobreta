
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DetalheProvider } from '../../providers/detalhe/detalhe';



@IonicPage()
@Component({
  selector: 'page-detalhe',
  templateUrl: 'detalhe.html',
})
export class DetalhePage {

  treinos: Observable<any[]>;
  categoria:any;
  form: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,

              private detalheProvider: DetalheProvider) {

              this.categoria = this.navParams.data.categoria || {};
              this.treinos = this.detalheProvider.getAllTreinos(this.navParams.data.categoriakey);

  }

  editItemProdutos(treino: any) {                      // categoria.key é igual ao
    this.navCtrl.push('EditTreinoPage', { treinoKey: treino.key });
  }

  // removeItemProdutos(key:string, removeImg:boolean) {
  //   this.detalheProvider.remove(key, removeImg);
  //   this.toast.show('Produto removido com sucesso.');
  // }


  newDetail() {
    this.navCtrl.push('EditDetalhePage');
  }

}
