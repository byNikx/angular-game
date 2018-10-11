import {
  Component,
  OnInit,
  HostListener,
  Renderer2,
  ElementRef,
  Output,
  EventEmitter,
  InjectionToken
} from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Output('active') active: EventEmitter<any> = new EventEmitter<any>(null);
  @Output('deactive') deactive: EventEmitter<any> = new EventEmitter<any>(null);
  _id: InjectionToken<TileComponent> = new InjectionToken<TileComponent>('TileComponent');

  /**
   * Event listener co capture the click event on the tile
   * @param tile
   */
  @HostListener('click', ['$event.target']) handleClick(tile: TileComponent): void {
    console.log(tile);

    if (this.isActive()) {
      this.deactivate();
      this.startCountDown(2000);
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
   */
  public activate(): void {
    this.renderer.addClass(this.tileRef.nativeElement, 'active');
  }

  /**
   * Deactivates the tile
   */
  public deactivate(): void {
    this.renderer.removeClass(this.tileRef.nativeElement, 'active');
    this.deactive.emit();
  }

  /**
   * Returns tiles status
   * @returns boolean
   */
  public isActive(): boolean {
    return this.tileRef.nativeElement.className.split(' ').indexOf('active') > -1;
  }

  /**
   * Set up the timer to activate the tile
   * @param timer
   */
  private startCountDown(timer: number): void {
    setTimeout(() => {
      this.activate();
    }, timer);
  }

}
