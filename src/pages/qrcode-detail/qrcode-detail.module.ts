import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrcodeDetailPage } from './qrcode-detail';

@NgModule({
  declarations: [
    QrcodeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(QrcodeDetailPage),
  ],
})
export class QrcodePageModule {}
