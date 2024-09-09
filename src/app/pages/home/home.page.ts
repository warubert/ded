import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

//services
import { ApiService } from '../../services/api/api.service';
import { rxdbService } from '../../services/rxdb/rxdb.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  menuItems: string[] = []
  selected: string = ""
  optionSelected: string = ""
  objSelected: any
  selectedOptions: any[] = []
  lang: string = "pt"

  constructor(
    private apiService: ApiService,
    private rxdbService: rxdbService,
    private menu: MenuController,
  ) {}

  async ngOnInit() {
    console.log("home")
    this.menuItems = Object.keys(this.apiService.resources)
    console.log(this.menuItems)
    // let aux = await this.apiService.getAbilityScores()
    // console.log("aaaaaaaaaaaaa", aux)
  }

  async selectMenuItem(option: string){
    this.selected = option
    if(option === "home") {

    } else if (option === "rxdb"){
      this.selectedOptions = await this.rxdbService.findAS()
      for(let i=0; i < this.selectedOptions.length; i++){
        this.selectedOptions[i] = this.processObjectWithLang(this.selectedOptions[i], this.lang)
      }
      console.log(this.selectedOptions)
    } else {
      this.selectedOptions = await this.apiService.getFeature(option)
      console.log(this.selectedOptions)
    }

    this.optionSelected = ""
    this.objSelected = null
    this.menu.close();
  }

  processObjectWithLang(obj:any, lang:string) {
    const result = { ...obj };

    for (const [key, value] of Object.entries(result)) {
      if (Array.isArray(value)) {
        if (key === 'skills') {
          // Para a propriedade 'skills', extrair 'name.value' do idioma correspondente
          result[key] = value.map(skill => {
            const nameItem = skill.name.find((item: any) => item.lang === lang);
            return {
              ...skill,
              name: nameItem ? nameItem.value : `No name found for language ${lang}`
            };
          });
        } else {
          // Para outras propriedades, buscar o valor do campo 'value'
          const found = value.find(item => item.lang === lang);
          result[key] = found ? found.value : `No value found for language ${lang}`;
        }
      }
    }

    delete result._meta
    delete result._deleted
    delete result._attachments
    delete result._rev
  
    return result;
  };

  async handleChange(){
    console.log(this.optionSelected)
    this.objSelected = JSON.stringify(await this.apiService.getFeatureByIndex(this.optionSelected),null,4)
    console.log(this.objSelected)
  }

  async handleChangeRxdb(){
    console.log(this.optionSelected)
    this.objSelected = await this.rxdbService.findASbyIndex(this.optionSelected)
    console.log(this.objSelected)
    this.objSelected = this.processObjectWithLang(this.objSelected, this.lang)
    console.log(this.objSelected)
    // this.objSelected = JSON.stringify(this.objSelected,null,2)
    // console.log(this.objSelected)
  }

  async changeLang() {
    await this.handleChangeRxdb()
  }
  
}
