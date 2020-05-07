import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface ChartItem {
  itemName: string;
  itemPrice: string;
  itemAmount: string;
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

  /**
   * Reordena os itens
   */
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
      itemAmount: '',
      itemPrice: ''  
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

  saveItemListToLocalStorageCompleted() {
    const currentList = JSON.stringify(this.itemList)
    localStorage.setItem('currentList', currentList);
  }

  retrieveItemListFromLocalStorageCompleted() {
    const currentList = JSON.parse(localStorage.getItem('currentList'));
    if (currentList !== null) {
      this.itemList = currentList;
    }

  }

  /**
   * Soma dos itens = total
   */
  ngOnInit()  {  
    this
    .total = this.itemList.reduce((a, b) => a + (parseFloat(b.itemAmount) * parseFloat(b.itemPrice)), 0);
    this.saveItemListToLocalStorage();
  }

  /**
   * Adiciona um item
   */
  addItem() {
    console.log('Adicionar Item');
    console.log(this.currentItem);
    this.itemList.push(this.currentItem);
    this.saveItemListToLocalStorage();
    //this.initializeEmptyItem();
    this.ngOnInit();
  }

  /**
   * Item concluído é movido para outra lista
   */
  checkmarkItem(itemIndex: number) {
    console.log('Item da lista é movido para lista de itens concluídos')
    console.log(itemIndex)
    console.log(this.itemList)
    this.itemListCompleted.push(this.itemList[itemIndex])
    this.itemList.splice(itemIndex, 1);
    this.saveItemListToLocalStorage();
    this.retrieveItemListFromLocalStorage();
    this.ngOnInit();

   
    

  }




  /**
   * Exclui um item
   */
  deleteItem(itemIndex: number) {
    this.itemList.splice(itemIndex, 1);
    this.saveItemListToLocalStorage();
    this.ngOnInit();
  }

  /**
   * Atualiza os dados do item
   */
  editItem(itemIndex) {
    // Mostrar o Alert
    this
      .editItemAlert(itemIndex)
      .then(alert => {
        alert.present();
      })
    // ----

  }

  /**
   * Cria o modal do alert
   * @returns Alert
   */
  async editItemAlert(itemIndex) {
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
              this.ngOnInit();
            }
          }
        ]
      })
    
    return alert;
  }





    /**
   * Adiciona um item
   */
  addAnItem() {
    // Mostrar o Alert
    this
      .addAlert()
      .then(alert => {
        alert.present();
      })
    // ----

  }

  /**
   * Cria o modal do alert
   * @returns Alert
   */
  async addAlert() {
    console.log(this.itemList)
    const alert = await this.alertCtrl.create({
        message: 'Adicione seu item.',
        inputs: [
          {
            name: 'itemName',
            label: 'Descrição',
            placeholder: 'Nome do Item',
            value: this.currentItem.itemName
          },
          {
            name: 'itemAmount',
            label: 'Qtd',
            placeholder: 'Quantidade',
            value: this.currentItem.itemAmount
          },
          {
            name: 'itemPrice',
            label: 'Preço',
            placeholder: 'Preço',
            value: this.currentItem.itemPrice
          }
        ],
        buttons: [
          { 
            text: 'Cancelar',
            role: 'cancel' 
          },
          {
            text: 'Adicionar',
            handler: data => {
            console.log(data)
            console.log('Adicionar Item');
            console.log(this.currentItem);
            this.itemList.push(data);
            this.saveItemListToLocalStorage();
            this.initializeEmptyItem();
            this.ngOnInit();
            }
          }
        ]
      })
    
    return alert;
  }

  


}