import { Injectable } from '@angular/core';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { createRxDatabase } from 'rxdb';

//schemas
import { abilityScoresSchema } from '../../db/en/ability-scores/ability-scores.schema';
import { alignmentsSchema } from '../../db/en/alignments/alignments.schema';

//data
import { abilityScores }  from '../../db/en/ability-scores/ability-scores';
import { alignments } from '../../db/en/alignments/alignments';

@Injectable({
  providedIn: 'root'
})
export class rxdbService {
  public myDatabase: any
  public dbName: string = "ded"
  public collections: string[] = [
    "ability_scores",
    "alignments"
  ]
  public schemas: any[] = [
    abilityScoresSchema,
    alignmentsSchema
  ]

  constructor() {}

  setDatabase(db: any) {
    this.myDatabase = db;
  }

  async initDatabase() {
    this.myDatabase = await createRxDatabase({
    name: this.dbName,
    storage: getRxStorageDexie()
    });

    for(let i=0; i < this.collections.length; i++)
    await this.myDatabase.addCollections({
      [this.collections[i]]: {
        schema: this.schemas[i]
      }
    });
  }

  async destroyDatabase() {
    if (this.myDatabase) {
      for(let i=0; i < this.collections.length; i++){
        const foundDocuments = await this.myDatabase[this.collections[i]].find({
        }).exec();
        for (const doc of foundDocuments) {
          await doc.remove();
        }
      }
      await this.myDatabase.destroy();
      console.log("destruiu")
    }
  }

  async findCollection(collection: string){
    return (await this.myDatabase[collection].find({
    }).exec()).map( (doc:any) => {return doc._data});
  }

  async findIndex(index: string, collection: string) {
    let result = await this.myDatabase[collection].findOne({
      selector: {
        index: index
      }
    }).exec();
   
    return result ? result._data : null;
  }

  async insertCollections(){
    for(let i=0; i < abilityScores.length; i++){
      console.log("inserindo", abilityScores[i].index, "...")
      await this.myDatabase['ability_scores'].insert(abilityScores[i]);
    }
    for(let i=0; i < alignments.length; i++){
      console.log("inserindo", alignments[i].index, "...")
      await this.myDatabase['alignments'].insert(alignments[i]);
    }
  }
}
