import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  public visible = false;   
  public visibleAnimate = false; 
 
  public show(): void {     
    this.visible = true;     
    setTimeout(() => this.visibleAnimate = true, 100);   
  } 
 
  public hide(): void {     
    this.visibleAnimate = false;     
    setTimeout(() => this.visible = false, 300);
  } 
 
  public onContainerClicked(event: MouseEvent): void {     
    if ((<HTMLElement>event.target).classList.contains('modal')) {       
      this.hide();     
    }   
  } 
  
} 
