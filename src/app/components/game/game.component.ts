import { Component, OnInit, Input, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { TileComponent } from '../tile/tile.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {

  /**
   * Count for row and columns
   */
  private _n: number;
  @Input('n') set n(n: number) {
    this._n = n;
  }
  get n(): number {
    return this._n;
  }

  /**
   * Number of active tiles
   */
  private _y: number;
  @Input('y') set y(y: number) {
    this._y = y;
  }
  get y(): number {
    return this._y;
  }


  /**
   * Reference to all the tiles on the matrix
   */
  @ViewChildren(TileComponent) private tiles: QueryList<TileComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.randomise();
  }

  public randomise(): void {
    this.tiles
      .map((tile: TileComponent) => {
        tile.deactivate();
        return tile;
      })
      .sort(() => {
        return 0.5 - Math.random();
      })
      .slice(0, this.y)
      .forEach((tile: TileComponent) => {
        tile.activate();
      });
  }

  /**
   * Creates array of given length
   * @param count
   */
  public numberToArray(count: number): any[] {
    return Array.from({ length: count }, () => '');
  }

}
