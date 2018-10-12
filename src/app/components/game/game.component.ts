import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  AfterViewInit,
  QueryList,
} from '@angular/core';

import { TileComponent } from '../tile/tile.component';
import { GameStatus } from '../../game/game.constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {

  private _activeTiles: TileComponent[];
  /**
   * Count for row and columns
   */
  private _n = 5;
  @Input('n') set n(n: number) {
    this._n = n;
  }
  get n(): number {
    return this._n;
  }

  /**
   * Number of active tiles
   */
  private _y = 2;
  @Input('y') set y(y: number) {
    this._y = y;
  }
  get y(): number {
    return this._y;
  }

  /**
   * Time to reactivate the tile in seconds
   */
  private _z = 5;
  @Input('z') set z(z: number) {
    this._z = z;
  }
  get z(): number {
    return this._z;
  }


  /**
   * Reference to all the tiles on the matrix
   * @type QueryList<TileComponent>
   */
  @ViewChildren(TileComponent) private tiles: QueryList<TileComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.randomise();
  }

  /**
   * Randomise the the game
   * @returns void
   */
  public randomise(): void {
    this._activeTiles = this.tiles
      .map((tile: TileComponent) => {
        tile.deactivate();
        return tile;
      })
      .sort(() => {
        return 0.5 - Math.random();
      })
      .slice(0, this.y);

    this._activeTiles.forEach((tile: TileComponent) => {
      tile.activate();
    });
  }

  /**
   * Creates array of given length
   * @param count
   * @returns any[]
   */
  public numberToArray(count: number): any[] {
    return Array.from({ length: count }, () => '');
  }

  public onStatusChange(status): void {

  }

  private checkStatus(): GameStatus {
    return GameStatus.End;
  }

  private declareWinner(): void {

  }

  private declareloser(): void {

  }

}
