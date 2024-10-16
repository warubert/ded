import { Component, OnInit } from '@angular/core';
import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

//services
import { rxdbService } from './services/rxdb/rxdb.service';

addRxPlugin(RxDBDevModePlugin);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',  
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private rxdbService: rxdbService,) {}

  async ngOnInit() {
    console.log("Init...")

    await this.rxdbService.initDatabase();

    const foundDocuments = await this.rxdbService.findAS()
    console.log(foundDocuments)

    //testa se documento existe (nesse caso banco existe)
    if(foundDocuments.length == 0) {
      console.log("insere documentos")
      await this.rxdbService.insertAS()
    } else {
      console.log("documento existe")
    }

    const foundDocuments2 = await this.rxdbService.findAS()
    console.log(foundDocuments2.map( (doc:any) => {return doc._data}))
    await this.rxdbService.destroyDatabase();
  }
}
