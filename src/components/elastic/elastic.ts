import {HostListener, Directive} from '@angular/core';

@Directive({
    selector: '[elastic]'
})

//automatically increase textarea's height
export class Elastic {
    @HostListener('input',['$event.target'])
    onInput(nativeElement: any): void {
      nativeElement.style.overflow = 'hidden';
      nativeElement.style.width = 'inherit';
      nativeElement.style.height = 'auto';
      nativeElement.style.height = nativeElement.scrollHeight + "px";
    }
}
