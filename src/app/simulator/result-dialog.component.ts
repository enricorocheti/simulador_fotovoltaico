import { Component, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['result-dialog.component.scss']
})
export class ResultDialog {

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<ResultDialog>) { }

  csvData: any[] = [];
  csvTitle: any = {
    moduleEnergy: 'Energia por módulo',
    moduleQuantity: 'Qtd de módulos',
    moduleModel: 'Modelo do módulo',
    moduleTotalPeakPower: 'Potência de pico do módulo',
    inverterModel: 'Modelo do inversor',
    inverterTotalPower: 'Potência do inversor',
    inverterQuantity: 'Qtde de inversores',
    priceModule: 'Gasto com módulos',
    priceInverter: 'Gasto com inversores',
    priceStructure: 'Gasto com infra',
    totalPrice: 'Investimento total',
    wattPeakPrice: 'Custo por Wp',
    city: 'Cidade',
    state: 'Estado'
  }

  close(clearData: boolean): void {
    this.dialogRef.close(clearData);
  }

  exportCsv(): void {
    this.csvData.length = 0;
    this.csvData.push(this.csvTitle);
    this.csvData.push(this.data);
    console.log(this.csvData);
    new Angular2Csv(this.csvData, 'simulação_fotovoltaica');
  }
 
}
