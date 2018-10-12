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
import { TileStyleClass, TileStatus } from '../../game/game.constants';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Output('active') active: EventEmitter<any> = new EventEmitter<any>(null);
  @Output('deactive') deactive: EventEmitter<any> = new EventEmitter<any>(null);

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
      this.deactivate();
      this.startCountDown(this.countdown);
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
    this.renderer.addClass(this.tileRef.nativeElement, TileStyleClass.Active);
    this.deactive.emit(TileStatus.Active);
  }

  /**
   * Deactivates the tile
   * @returns void
   */
  public deactivate(): void {
    this.renderer.removeClass(this.tileRef.nativeElement, TileStyleClass.Active);
    this.deactive.emit(TileStatus.Deactive);
  }

  /**
   * Returns tiles status
   * @returns boolean
   */
  public isActive(): boolean {
    return this.tileRef.nativeElement.className.split(' ').indexOf(TileStyleClass.Active) > -1;
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
    clearTimeout(this._timer);
  }

}
