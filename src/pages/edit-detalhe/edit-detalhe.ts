
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastProvider } from './../../providers/toast/toast';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HomeProvider } from '../../providers/home/home';
import { DetalheProvider } from '../../providers/detalhe/detalhe';


@IonicPage()
@Component({
  selector: 'page-edit-detalhe',
  templateUrl: 'edit-detalhe.html',
})
export class EditDetalhePage {

  title: string;
  form: FormGroup;
  categories: Observable<any>;
  treinos: any;
  categoriaItem:any;
  private file: File = null;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private toast: ToastProvider,
              private detalheProvider: DetalheProvider,
              private homeProvider: HomeProvider) {

      this.treinos = this.navParams.data.treino || {};
                this.SetupPageTitle();
                this.createForm();
                this.loadCategories();

                const subscribe = this.detalheProvider.get(this.navParams.data.treinoKey).subscribe((detalheData: any) => {
                  subscribe.unsubscribe();
                  this.treinos = detalheData;
                  this.createForm();
                });



  }
  private SetupPageTitle(){
    if (this.navParams.data.treinos){
      this.title = 'Alterando produtos';
    } else {
      this.title = 'Novo produto';
    }
  }

  private createForm(){
    this.form = this.formBuilder.group({
      key: [this.treinos.key],
      descricao: [this.treinos.descricao],
      quantidade: [this.treinos.quantidade],
      categoryKey: [this.treinos.categoryKey, Validators.required],
      categoryName: [this.treinos.categoryName],
    })
  }

  onSubmit(){
    if (this.form.valid) {
      this.detalheProvider.save(this.form.value, this.file);
      this.toast.show('Produtos salvo com sucesso');
      this.navCtrl.pop();
    }
  }

  private loadCategories() {
    this.categories = this.homeProvider.getAll();
  }

  getCategorias() {
    const subscribe = this.homeProvider.get(this.form.value.categoryKey).subscribe((categoriasData: any) => {
      subscribe.unsubscribe();
      this.categoriaItem = categoriasData;
      console.log(this.categoriaItem);
      this.form.controls['categoryName'].setValue(this.categoriaItem.nome);
      console.log(this.categoriaItem.name);
    });
  }







}

