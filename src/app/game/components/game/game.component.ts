import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  AfterViewInit,
  QueryList,
  ChangeDetectorRef,
} from '@angular/core';

import { TileComponent } from '../tile/tile.component';
import { GameState, TileState } from '../../game.constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {

  // Collection of active tiles on the matric
  private _activeTiles: TileComponent[];

  // Placeholder for matrix size (n)
  private matrixSize: number;

  /**
   * Count for row and columns
   */
  private _n = 10;
  @Input('n') set n(n: number) {
    this._n = n;
  }
  get n(): number {
    return this._n;
  }

  /**
   * Count of active tiles
   */
  private _y = 10;
  @Input('y') set y(y: number) {
    this._y = y;
    this.gameStatus.activeTiles = y;
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

  // Game status object
  private gameStatus = {
    state: GameState.Pristine,
    activeTiles: this.y,
  };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.matrixSize = this.n;
  }

  ngAfterViewInit(): void {
    this.randomise();
  }

  /**
   * Randomise the the game
   * @returns void
   */
  public randomise(): void {
    this.cdr.detectChanges();
    this._activeTiles = this.tiles
      .map((tile: TileComponent) => {
        tile.reset();
        return tile;
      })
      .sort(() => {
        return 0.5 - Math.random();
      })
      .slice(0, this.y);

    this._activeTiles.forEach((tile: TileComponent) => {
      tile.highlight();
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

  public onStateChange(state: TileState): void {

    if (state === TileState.Deactive) {
      this.gameStatus.activeTiles--;
    } else {
      this.gameStatus.activeTiles++;
    }

    // Plaeholder for active tiles count
    const activeTiles = this.gameStatus.activeTiles;

    // Decision making logic
    if (activeTiles <= 0) {
      this.gameStatus.state = GameState.Win;
    } else if (activeTiles >= this.y) {
      this.gameStatus.state = GameState.Lose;
    } else {
      this.gameStatus.state = GameState.Dirty;
    }

    if (this.getState() === GameState.Win) {
      this.declareWinner();
      this.finish();
    } else if (this.getState() === GameState.Lose) {
      this.declareLoser();
      this.finish();
    }
  }

  private getState(): GameState {
    return this.gameStatus.state;
  }

  private declareWinner(): void {
    alert('Yea!! you won.\n wanna play again?');
    this.restart();
  }

  private declareLoser(): void {
    alert('Oppss. you lose.\n try again?')
    this.restart();
  }

  private finish(): void {
    this._activeTiles.forEach((tile: TileComponent) => {
      tile.stopCountDown();
    });
    this.gameStatus.state = GameState.End;
  }

  private restart(): void {
    this.matrixSize = this.n;
    this.gameStatus = {
      state: GameState.Pristine,
      activeTiles: this.y
    };
    this.randomise();
  }


}
