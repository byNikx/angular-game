import {
  Component,
  OnInit,
  HostListener,
  Renderer2,
  ElementRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { TileStyleClass, TileState } from '../../game.constants';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Output('stateChange') stateChange: EventEmitter<TileState> = new EventEmitter<TileState>();

  /**
   * Refernce to countdown timer
   */
  private _timer: any;

  private _countdown: number;
  @Input('countdown') set countdown(time: number) {
    this._countdown = time;
  }
  get countdown(): number {
    return this._countdown * 1000;
  }

  /**
   * Event listener co capture the click event on the tile
   * @param tile
   */
  @HostListener('click', ['$event.target']) handleClick(tile: TileComponent): void {

    if (this.isActive()) {
      this.startCountDown(this.countdown);
      this.deactivate();
    }
  }


  constructor(
    private renderer: Renderer2,
    private tileRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  /**
   * Activates the tile
   * @returns void
   */
  public activate(): void {
    this.highlight();
    this.stateChange.emit(TileState.Active);
  }

  /**
   * Deactivates the tile
   * @returns void
   */
  public deactivate(): void {
    this.renderer.removeClass(this.tileRef.nativeElement, TileStyleClass.Active);
    this.stateChange.emit(TileState.Deactive);
  }

  public highlight(): void {
    this.renderer.addClass(this.tileRef.nativeElement, TileStyleClass.Active);
  }

  public reset(): void {
    this.renderer.removeAttribute(this.tileRef.nativeElement, 'class');
    this.stopCountDown();
  }

  /**
   * Returns tiles status
   * @returns boolean
   */
  public isActive(): boolean {
    return this.tileRef.
      nativeElement.className.split(' ')
      .indexOf(TileStyleClass.Active) > -1;
  }

  /**
   * Set up the timer to activate the tile
   * @param timer
   * @returns void
   */
  private startCountDown(timer: number): void {
    this._timer = setTimeout(() => {
      this.activate();
    }, timer);
  }

  /**
   * Set up the timer to activate the tile
   * @returns void
   */
  public stopCountDown(): void {
    if (this._timer) {
      clearTimeout(this._timer);
    }
  }

}
