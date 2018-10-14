import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TileComponent } from './components/tile/tile.component';
import { GameComponent } from './components/game/game.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
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
