import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input()
  player: Player = {} as Player;

  constructor() { }

  ngOnInit(): void {
  }

}
