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
  collections: string[] = []

  constructor(
    private apiService: ApiService,
    private rxdbService: rxdbService,
    private menu: MenuController,
  ) {}

  async ngOnInit() {
    this.collections = this.rxdbService.collections
    console.log("home")
    this.menuItems = Object.keys(this.apiService.resources)
    console.log(this.menuItems)
    // let aux = await this.apiService.getAbilityScores()
    // console.log("aaaaaaaaaaaaa", aux)
  }

  async selectMenuItem(option: string){
    this.selected = option
    if(option === "home") {

    } else {
      this.selectedOptions = await this.rxdbService.findCollection(option)
      for(let i=0; i < this.selectedOptions.length; i++){
        this.selectedOptions[i] = this.selectedOptions[i]
      }
      console.log(this.selectedOptions)
    }

    this.optionSelected = ""
    this.objSelected = null
    this.menu.close();
  }

  async handleChange(){
    this.objSelected = await this.rxdbService.findIndex(this.optionSelected, this.selected)
  }
}
