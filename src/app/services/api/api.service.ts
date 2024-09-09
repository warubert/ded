import { Injectable } from '@angular/core';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = "https://www.dnd5eapi.co/api/";
  private apiURL2 = "https://www.dnd5eapi.co";

  public resources = {
    "ability-scores": "/api/ability-scores",
    "alignments": "/api/alignments",
    "backgrounds": "/api/backgrounds",
    "classes": "/api/classes",
    "conditions": "/api/conditions",
    "damage-types": "/api/damage-types",
    "equipment": "/api/equipment",
    "equipment-categories": "/api/equipment-categories",
    "feats": "/api/feats",
    "features": "/api/features",
    "languages": "/api/languages",
    "magic-items": "/api/magic-items",
    "magic-schools": "/api/magic-schools",
    "monsters": "/api/monsters",
    "proficiencies": "/api/proficiencies",
    "races": "/api/races",
    "rule-sections": "/api/rule-sections",
    "rules": "/api/rules",
    "skills": "/api/skills",
    "spells": "/api/spells",
    "subclasses": "/api/subclasses",
    "subraces": "/api/subraces",
    "traits": "/api/traits",
    "weapon-properties": "/api/weapon-properties"
  }

  constructor() {}

  /**
  * Get all recipes
  * @param page number for set page requested
  */
  getFeature(feature: string) {
    return axios
      .get(this.apiURL+feature)
      .then((response) => {
        return response.data.results;
      })
  }

  getFeatureByIndex(url: string) {
    let urlAux = this.apiURL2 + url
    console.log(urlAux)
    return axios
      .get(urlAux)
      .then((response) => {
        return response.data;
      })
  }

}
