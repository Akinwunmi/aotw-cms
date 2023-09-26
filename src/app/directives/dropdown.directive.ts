import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { merge, Observable, of, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[aotwDropdownTrigger]',
  standalone: true
})
export class DropdownDirective implements OnDestroy {
  @Input('aotwDropdownTrigger')
  public contentRef!: TemplateRef<unknown>;

  @HostListener('click')
  public toggle(): void {
    this.isOpen ? this.detach() : this.open();
  }

  private elementRef = inject(ElementRef<HTMLElement>);
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);

  private overlayRef?: OverlayRef;

  private destroy$ = new Subject<void>();

  private isOpen = false;

  public ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }

  private open(): void {
    const position: ConnectedPosition = {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 4
    };
    const templatePortal = new TemplatePortal(
      this.contentRef,
      this.viewContainerRef
    );

    this.isOpen = true;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([position])
    });
    this.overlayRef.attach(templatePortal);

    this.actions().pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.detach();
    });
  }

  private actions(): Observable<MouseEvent | void> {
    if (!this.overlayRef) {
      return of();
    }

    const backdropClick$ = this.overlayRef.backdropClick();
    const detachments$ = this.overlayRef.detachments();

    return merge(backdropClick$, detachments$);
  }

  private detach(): void {
    this.isOpen = false;
    this.overlayRef?.detach();
  }
}
