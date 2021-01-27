
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/observable';
import { HomeProvider } from '../../providers/home/home';
import { AngularFireAuth } from 'angularfire2/auth';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  userName: string;
  categorias: Observable<any[]>;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private auth: AngularFireAuth,
    private homeProvider: HomeProvider) {

      this.categorias = this.homeProvider.getAll();


  }

  ionViewDidLoad() {
    const userState = this.auth.authState.subscribe( user => {
      if (user){
        this.userName = user.displayName;
        userState.unsubscribe();
      }

    })
  }

  newCategory(){
    this.navCtrl.push('EditHomePage');
  }



  editCategory(categoria: any){
    this.navCtrl.push('EditHomePage', { categoriakey: categoria.key});
  }

  removeCategory(key:string){
    this.homeProvider.remove(key);
    this.toast.create({message:'Produto removido com sucesso!', duration: 3000}).present();
  }

  listProdutos(categoria: any){
    this.navCtrl.push('DetalhePage', {categoriakey: categoria.key})
  }
}
