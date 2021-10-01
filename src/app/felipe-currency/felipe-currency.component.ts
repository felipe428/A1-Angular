import { Component, OnInit } from '@angular/core';
import { FelipeWalletService } from '../felipe-wallet.service';

@Component({
  selector: 'app-felipe-currency',
  templateUrl: './felipe-currency.component.html',
  styleUrls: ['./felipe-currency.component.css'],
})
export class FelipeCurrencyComponent implements OnInit {
  constructor(public wallet: FelipeWalletService) {}

  ngOnInit() {
    this.wallet.updateUSDeBRL();
    this.wallet.updateEUR();
    this.wallet.interval();
  }

  updateUSDeBRL() {
    this.wallet.updateUSDeBRL;
  }

  updateEUR() {
    this.wallet.updateEUR();
  }

  interval() {
    this.wallet.interval();
  }
}
