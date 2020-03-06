import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface ChartItem {
  itemName: string;
  itemPrice: number;
  itemAmount: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {

  itemList: Array<ChartItem> = [ ]
  currentItem: ChartItem;
  itemListCompleted: Array<ChartItem> = [ ]
  total: number;


  constructor(
    private alertCtrl: AlertController
  ) { 
    this.initializeEmptyItem();
    this.retrieveItemListFromLocalStorage();
    console.log(localStorage);
  }

  reorderItems(event)
  {
    console.log(event);
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const itemMove = this.itemList.splice(event.detail.from, 1)[0];
    this.itemList.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
  };

  /**
   * Inicializa o item atual com vazio
   */
  initializeEmptyItem() {
    this.currentItem = {
      itemName: '',
      itemAmount: 0,
      itemPrice: 0  
    }
  }

  /** 
   * Salvar a lista atual no localStorage
   */
  saveItemListToLocalStorage() {
    const currentList = JSON.stringify(this.itemList)
    localStorage.setItem('currentList', currentList);
  }

  retrieveItemListFromLocalStorage() {
    const currentList = JSON.parse(localStorage.getItem('currentList'));
    if (currentList !== null) {
      this.itemList = currentList;
    }

  }


  addItem() {
    console.log('Adicionar Item');
    console.log(this.currentItem);
    this.itemList.push(this.currentItem);
    this.saveItemListToLocalStorage();
    this.initializeEmptyItem();
  }

  /**
   * Exclui uma task
   */
  deleteItem(itemIndex: number) {
    this.itemList.splice(itemIndex, 1);
    this.saveItemListToLocalStorage();
  }

  /**
   * Atualiza os dados da task
   */
  editItem(itemIndex) {
    // Mostrar o Alert
    this
      .createAlert(itemIndex)
      .then(alert => {
        alert.present();
      })
    // ----

  }

  /**
   * Cria o modal do alert
   * @returns Alert
   */
  async createAlert(itemIndex) {
    const editingItem: ChartItem = this.itemList[itemIndex];
    const alert = await this.alertCtrl.create({
        message: 'Edite seu item.',
        inputs: [
          {
            name: 'itemName',
            label: 'Descrição',
            placeholder: 'Nome do Item',
            value: editingItem.itemName
          },
          {
            name: 'itemAmount',
            label: 'Qtd',
            placeholder: 'Quantidade',
            value: editingItem.itemAmount
          },
          {
            name: 'itemPrice',
            label: 'Preço',
            placeholder: 'Preço',
            value: editingItem.itemPrice
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
              console.log('Item a ser alterado');
              console.log(data);
              this.itemList[itemIndex] = data;
              this.saveItemListToLocalStorage();
            }
          }
        ]
      })
    
    return alert;
  }


}