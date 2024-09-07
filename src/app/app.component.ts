import { Component } from '@angular/core';
import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { createRxDatabase } from 'rxdb';

//schemas
import { abilityScoresSchema } from './db/ability-scores/ability-scores.schema';

//data
import { abilityScores }  from './db/ability-scores/ability-scores';

addRxPlugin(RxDBDevModePlugin);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',  
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  myDatabase: any

  constructor() {}

  async ngOnInit() {
    console.log("Init...")
    await this.initDatabase();

    const foundDocuments = await this.myDatabase.ability_scores.find({
    }).exec();
    console.log(foundDocuments)

    //testa se documento existe (nesse caso banco existe)
    if(foundDocuments.length == 0) {
      console.log("insere documentos")
      for(let i=0; i < abilityScores.length; i++){
        await this.myDatabase['ability_scores'].insert(abilityScores[i]);
      }
    } else {
      console.log("documento existe")
    }

    const foundDocuments2 = await this.myDatabase.ability_scores.find({
    }).exec();
    console.log(foundDocuments2.map( (doc:any) => {return doc._data}))
    await this.destroyDatabase();
  }

  async initDatabase() {
    this.myDatabase = await createRxDatabase({
    name: 'ded_db',
    storage: getRxStorageDexie()
    });

    await this.myDatabase.addCollections({
      ability_scores: {
        schema: abilityScoresSchema
      }
    });
  }

  async destroyDatabase() {
    if (this.myDatabase) {
      console.log("destruiu")
      const foundDocuments = await this.myDatabase.ability_scores.find({
      }).exec();
      for (const doc of foundDocuments) {
        await doc.remove();
      }
      await this.myDatabase.destroy();
    }
  }
}
