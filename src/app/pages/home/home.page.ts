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

  taskList = [];
  taskName = [];
  index = [];
  taskValue = [];

  constructor(
    private alertCtrl: AlertController
  ) { }

  addChartItem() {

  }

  addTask() {
    if (this.taskName.length > 0) {
      let task = this.taskName;
      this.taskList.push(task);
      this.taskName = [];
    }
  }

  /**
   * Exclui uma task
   */
  deleteTask(taskIndex: number) {
    this.taskList.splice(taskIndex, 1);
  }

  /**
   * Atualiza os dados da task
   */
  updateTask() {

  }

  editTask(taskIndex) {
    // Mostrar o Alert
    this.createAlert(taskIndex).then(alert => {
      alert.present();
    })
    // ----

  }

  /**
   * Cria o modal do alert
   * @returns Alert
   */
  async createAlert(taskIndex) {
    const alert = await this.alertCtrl.create({
        message: 'Edite seu item.',
        inputs: [
          {
            name: 'taskName',
            label: 'Descrição',
            placeholder: 'Nome do Item'
          },
          {
            name: 'amount',
            label: 'Qtd',
            placeholder: 'Quantidade'
          },
          {
            name: 'taskValue',
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
              this.taskList[taskIndex] = data.taskName;
              this.taskValue[taskIndex] = data.taskValue; 
            }
          }
        ]
      })
    
    return alert;
  }


}