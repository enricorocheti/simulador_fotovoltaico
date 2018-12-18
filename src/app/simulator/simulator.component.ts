import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewContainerRef } from '@angular/core';

import { TdDialogService } from '@covalent/core';
import { MdDialog } from '@angular/material';

import { ResultDialog } from './result-dialog.component';
import { ConfirmDialog } from './confirm-dialog.component';
import { SimulatorService } from '../../services/simulator.service';

@Component({
  selector: 'simulator',
  templateUrl: 'simulator.component.html',
  styleUrls: ['simulator.component.scss'],
  providers: [SimulatorService]
})
export class Simulator implements OnInit {

  @ViewChild('moduleModelElement') moduleModelElement: any;

  gps_x: number = -47.0850446; //long
  gps_y: number = -22.8226801; //lat
  title: String = '';
  
  helpCard: boolean = false;

  moduleModel: string = '';
  modulePeakPower: number;
  moduleEfficiency: number;
  moduleArea: number;

  locationCity: string;
  locationState: string = '';
  cityDailyEnergy: number;

  inverterModel: string = '';
  inverterRatedPower: number;
  inverterEfficiency: number;
  inverterSizingFactor: number;

  desiredMonthlyEnergy: number;

  priceModule: number;
  priceInverter: number;
  priceStructure: number;
  priceInstallation: number;

  calcModuleEfficiency: number;
  calcModuleEnergy: number;
  calcModuleQuantity: number;
  calcModuleTotalArea: number;
  calcModuleTotalPeakPower: number;
  calcInverterTotalPower: number;
  calcInverterQuantity: number;

  calcPriceModule: number;
  calcPriceInverter: number;
  calcPriceStructure: number;
  calcTotalPrice: number;
  calcWattPeakPrice: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _viewContainerRef: ViewContainerRef,
    public dialog: MdDialog,
    private simulatorService: SimulatorService) { }

  ngOnInit(): void {
    
  }

  getDailyEnergyOnline(): void {
    this.simulatorService.getGlobalIrr().subscribe(
      (result: any) => {
        //console.log(result);
        alert(result.length);
        var radius = [1, 2, 3]; 
        alert(result[22].LONGITUDE);
        for (var i = 0; i < result.length; i++) {
          for (var j = 0; j < radius.length; j++){
            var x1 = this.gps_x;
            var y1 = this.gps_y;
            var x2 = result[i].LONGITUDE;
            var y2 = result[i].LATITUDE
            if (x1 + radius[j] >= x2 && y1 + radius[j] >= y2) {
                // problema: desse jeito ele está pegando todos os pontos do seu quadrante abaixo
            }
            if (x1 + radius[j] >= x2 && y1 + radius[j] >= y2) {
              
            }
          }
        }
      },
      (error: any) => {
        console.log('error');
      }
    );
  }

  toggleHelpCard(): void {
    this.helpCard = !this.helpCard;
  }

  simulate(): void {
    this.calcModuleEnergy = ((this.cityDailyEnergy * this.modulePeakPower) / 1000) * (this.inverterEfficiency / 100) * 30 / 1000;
    this.calcModuleQuantity = Math.ceil(this.desiredMonthlyEnergy / this.calcModuleEnergy);
    this.calcModuleTotalPeakPower = this.calcModuleQuantity * this.modulePeakPower;
    this.calcInverterTotalPower = this.calcModuleTotalPeakPower * this.inverterSizingFactor / 100;
    this.calcInverterQuantity = Math.ceil(this.calcInverterTotalPower / this.inverterRatedPower);
    this.calcPriceModule = this.calcModuleQuantity * this.priceModule;
    this.calcPriceInverter = this.calcInverterQuantity * this.priceInverter;
    this.calcPriceStructure = this.calcModuleQuantity * this.priceStructure;
    this.calcTotalPrice = +this.calcPriceModule + +this.calcPriceInverter + +this.calcPriceStructure + +this.priceInstallation;
    this.calcWattPeakPrice = this.calcTotalPrice / this.calcModuleTotalPeakPower;

    let resultsDialogRef = this.dialog.open(ResultDialog, {
      height: '535px',
      width: '60%',
      disableClose: true,
      data: { 
        moduleEnergy: this.calcModuleEnergy, 
        moduleQuantity: this.calcModuleQuantity, 
        moduleModel: this.moduleModel,
        moduleTotalPeakPower: this.calcModuleTotalPeakPower,
        inverterModel: this.inverterModel, 
        inverterTotalPower: this.calcInverterTotalPower,
        inverterQuantity: this.calcInverterQuantity, 
        priceModule: this.calcPriceModule,
        priceInverter: this.calcPriceInverter, 
        priceStructure: this.calcPriceStructure, 
        totalPrice: this.calcTotalPrice,
        wattPeakPrice: this.calcWattPeakPrice, 
        city: this.locationCity, 
        state: this.locationState
      },
    });
    resultsDialogRef.afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.clearData();
        this.moduleModelElement.nativeElement.focus();
      }
    });
  }

  confirmClearData(): void {
    let confirmDialogRef = this.dialog.open(ConfirmDialog, {
      height: '200px',
      width: '350px',
      disableClose: true,
      data: { 
        message: 'Você tem certeza que gostaria de apagar todos os dados de simulação?', 
        title: 'Confirmar',
        cancelButton: 'Cancelar',
        acceptButton: 'Limpar'
      },
    });
    confirmDialogRef.afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.clearData();
      }
    });
  }

  clearData(): void {
    this.moduleModel = '';
    this.modulePeakPower = null;
    this.moduleEfficiency = null;
    this.moduleArea = null;
    this.locationCity = '';
    this.locationState = '';
    this.cityDailyEnergy = null;
    this.inverterModel = '';
    this.inverterRatedPower = null;
    this.inverterEfficiency = null;
    this.inverterSizingFactor = null;
    this.desiredMonthlyEnergy = null;
    this.priceModule = null;
    this.priceInverter = null;
    this.priceStructure = null;
    this.priceInstallation = null;
  }

  example() {
    // scroll down
    this.moduleModel = 'genérico';
    this.modulePeakPower = 250;
    this.moduleEfficiency = null;
    this.moduleArea = null;
    this.locationCity = 'Campinas';
    this.locationState = 'São Paulo';
    this.cityDailyEnergy = 5620;
    this.inverterModel = 'genérico';
    this.inverterRatedPower = 2000;
    this.inverterEfficiency = 97.2;
    this.inverterSizingFactor = 80;
    this.desiredMonthlyEnergy = 300;
    this.priceModule = 899.00;
    this.priceInverter = 5670.00;
    this.priceStructure = 180.00;
    this.priceInstallation = 4850.00;
  }

}
