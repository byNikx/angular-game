import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../components/tile/tile.component';
import { GameComponent } from '../components/game/game.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TileComponent,
    GameComponent
  ],
  exports: [
    TileComponent,
    GameComponent
  ]
})
export class GameModule { }
