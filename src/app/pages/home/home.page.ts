import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface ChartItem {
  description?: string;
  amount: number;
  value: number,
  total: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {

  chartItem: ChartItem = {
    description: 'Primeiro Item',
    amount: 0,
    value: 0,
    total: 0
  }

  chartList = [];

  itemList = [];
  itemName = [];
  index = [];
  itemPrice = [];

  constructor(
    private alertCtrl: AlertController
  ) { }

  addChartItem() {

  }

  addItem() {
    if (this.itemName.length > 0) {
      let task = this.itemName;
      this.itemList.push(task);
      this.itemName = [];
    }
  }

  /**
   * Exclui uma task
   */
  deleteItem(itemIndex: number) {
    this.itemList.splice(itemIndex, 1);
  }

  /**
   * Atualiza os dados da task
   */
  updateItem() {

  }

  editItem(itemIndex) {
    // Mostrar o Alert
    this.createAlert(itemIndex).then(alert => {
      alert.present();
    })
    // ----

  }

  /**
   * Cria o modal do alert
   * @returns Alert
   */
  async createAlert(itemIndex) {
    const alert = await this.alertCtrl.create({
        message: 'Edite seu item.',
        inputs: [
          {
            name: 'itemName',
            label: 'Descrição',
            placeholder: 'Nome do Item'
          },
          {
            name: 'amount',
            label: 'Qtd',
            placeholder: 'Quantidade'
          },
          {
            name: 'itemPrice',
            label: 'Valor',
            placeholder: 'Valor'
          }
        ],
        buttons: [
          { 
            text: 'Cancelar',
            role: 'cancel' 
          },
          {
            text: 'Atualizar',
            handler: data => {
              this.itemList[itemIndex] = data.taskName;
              this.itemPrice[itemIndex] = data.taskValue; 
            }
          }
        ]
      })
    
    return alert;
  }


}