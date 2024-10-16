import { Injectable } from '@angular/core';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { createRxDatabase } from 'rxdb';

//schemas
import { abilityScoresSchema } from '../../db/en/ability-scores/ability-scores.schema';

//data
import { abilityScores }  from '../../db/en/ability-scores/ability-scores';

@Injectable({
  providedIn: 'root'
})
export class rxdbService {
  public myDatabase: any
  public dbName: string = "ded"

  constructor() {}

  setDatabase(db: any) {
    this.myDatabase = db;
  }

  async initDatabase() {
    this.myDatabase = await createRxDatabase({
    name: this.dbName,
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

  async findAS(){
    return (await this.myDatabase.ability_scores.find({
    }).exec()).map( (doc:any) => {return doc._data});
  }

  async findASbyIndex(index: string) {
    const result = await this.myDatabase.ability_scores.findOne({
      selector: {
        index: index
      }
    }).exec();
    
    return result ? result._data : null;
  }

  async insertAS(){
    for(let i=0; i < abilityScores.length; i++){
      console.log("inserindo", abilityScores[i].index, "...")
      await this.myDatabase['ability_scores'].insert(abilityScores[i]);
    }
  }
}
