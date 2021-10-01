import { Component, OnInit, Input } from '@angular/core';
import { FelipeWalletService } from '../felipe-wallet.service';

@Component({
  selector: 'app-felipe-wallet',
  templateUrl: './felipe-wallet.component.html',
  styleUrls: ['./felipe-wallet.component.css'],
})
export class FelipeWalletComponent implements OnInit {
  @Input() valor: number;

  constructor(public wallet: FelipeWalletService) {}

  ngOnInit() {}

  somar(valor: string) {
    let calculo: number;
    calculo = parseFloat(valor) / this.wallet.getBitcoin();
    this.wallet.somar(calculo);
  }

  subtrair(valor: string) {
    let calculo: number;
    calculo = parseFloat(valor) / this.wallet.getBitcoin();
    this.wallet.subtrair(calculo);
  }
}
