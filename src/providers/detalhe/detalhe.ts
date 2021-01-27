import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';




@Injectable()
export class DetalheProvider {
  private PATH = 'Detalhes/';


  constructor(private db: AngularFireDatabase,) {
  }

  public getAllTreinos(categoryKey: string) { //parâmetro vindo do construct
    return this.db.list(this.PATH, ref => {
      if (categoryKey) { // orderByChild(categorykey) é igual o que está vindo do parâmetro getAllProdutos(categorykey)
        return ref.orderByChild('categoryKey').equalTo(categoryKey) // equalTo(categoryKey) é igual ao do banco
      } else {
        return ref.orderByChild('name')
      }
    }).snapshotChanges().map(changes => {
      return changes.map(m => ({ key: m.key, data: m.payload.val() }));
    });
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('categoryName'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(m => ({ key: m.key, data: m.payload.val() }));
      });
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges();
  }
                  // file é o arquivo passando por parâmetro
  save(item: any, file: File) {
    const product = {
      descricao: item.descricao,
      quantidade: item.quantidade,
      categoryKey: item.categoryKey,
      categoryName: item.categoryName
    };

    if (item.key) {
      this.db.object(this.PATH + item.key).update(product).then(() => {
        // quando o usuário clicar pra salvar eu salvo a imagem e se salvou com sucesso (then) e daí fazer o upload da imagem
        // Se não ficaria assim: this.db.object(this.PATH + item.key).update(product);

      });
    } else {                                // a partir do then tenho na variavel result o resultado da inclusão e pego a key que foi incluída...
      this.db.list(this.PATH).push(product).then((result: any) => {

      });
    }
  }

   updateCategories(categoryKey: string, categoryName: string) {
                                   // fazendo uma consulta no Produtos com essa categoria
    const subscribe = this.db.list(this.PATH, ref => ref.orderByChild('categoryKey').equalTo(categoryKey))
      .snapshotChanges()
      .map(changes => {
        return changes.map(m => ({ key: m.key }));
      })          // neste subscrite Eu recebi a key do produto
      .subscribe(items => {
        subscribe.unsubscribe();

        items.forEach(product => {
          this.db.object(this.PATH + product.key).update({
            categoryKey: categoryKey,
            categoryName: categoryName
          });
        });
      });
  }

}
