import { Component } from '@angular/core';

/*import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';*/

import { QrcodePage } from '../qrcode/qrcode';
import { GanadoListPage } from '../ganado-list/ganado-list';
import {UploadImagePage} from '../upload-image/upload-image';

//import { HttpClient }   from '@angular/common/http';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GanadoListPage;
  tab2Root = QrcodePage;
  tab3Root = UploadImagePage;

  constructor() {

  }
}
