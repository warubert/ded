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
        this.selectedOptions[i] = this.selectedOptions[i]
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

  async handleChange(){
    console.log(this.optionSelected)
    this.objSelected = JSON.stringify(await this.apiService.getFeatureByIndex(this.optionSelected),null,4)
    console.log(this.objSelected)
  }

  async handleChangeRxdb(){
    this.objSelected = await this.rxdbService.findASbyIndex(this.optionSelected)
  }
}
