import { Injectable } from '@angular/core';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { createRxDatabase } from 'rxdb';

//schemas
import { abilityScoresSchema } from '../../db/ability-scores/ability-scores.schema';

//data
import { abilityScores }  from '../../db/ability-scores/ability-scores';

@Injectable({
  providedIn: 'root'
})
export class rxdbService {
  public myDatabase: any

  constructor() {}

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

  async findAS(){
    return (await this.myDatabase.ability_scores.find({
    }).exec()).map( (doc:any) => {return doc._data});
  }

  async findASbyIndex(index:string){
    return (await this.myDatabase.ability_scores.findOne({
      selector: {
        index: index
      }
    }).exec())._data
  }

  async insertAS(){
    for(let i=0; i < abilityScores.length; i++){
      await this.myDatabase['ability_scores'].insert(abilityScores[i]);
    }
  }
}
