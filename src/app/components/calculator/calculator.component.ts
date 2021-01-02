import { Component, OnInit } from '@angular/core';
import { PartyCalcService } from 'src/app/services/party-calc.service';
import { Player } from 'src/app/shared/player';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  partyLevel: number = 1;
  npcLevel: number = 0;
  baseExp: number = 0;
  players: Player[] = [];
  player: Player = { currExpGain: 0 } as Player;
  factors: any;

  constructor(private partyCalc: PartyCalcService) {
    this.factors = partyCalc.factors;
  }

  ngOnInit(): void {
  }

  calculate(): void {
    const avgLevel = this.getAvg();
    this.players.forEach(p => {
      p.currExpGain = this.partyCalc.calculatePartyXp(this.baseExp, p.level, this.npcLevel, avgLevel, this.players.length, this.partyLevel, 1);
    })
  }

  getAvg(): number {
    return !this.players.length ? 0 : this.players.reduce((acc, curr) => acc + curr.level, 0) / this.players.length;
  }

  addPlayer(): void {
    this.player.level = +this.player.level;
    this.players.push(this.player);
    this.player = { currExpGain: 0 } as Player;
    this.calculate();
  }

  removePlayer(index: number): void {
    this.players.splice(index, 1);
    this.calculate();
  }

}
