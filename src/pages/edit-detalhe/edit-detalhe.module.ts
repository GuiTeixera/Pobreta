import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDetalhePage } from './edit-detalhe';

@NgModule({
  declarations: [
    EditDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(EditDetalhePage),
  ],
})
export class EditDetalhePageModule {}
