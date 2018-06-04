// From http://www.brianchildress.co/posts/Angular-2-Modal-Service/
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./_modal.scss']
})
export class ModalComponent implements OnInit {
  isOpen: boolean = false;
  btn1Text = 'OK';
  btn2Text = 'Cancel';
  btn3Text = '';
  closeBtnValue: string = '';

  @Input() closebtn: boolean;
  @Input() modalId: string;
  @Input() modalTitle: string;
  
  //@HostListener('document:keyup', ['$event'])
  // keyup - Checks keys entered for the 'esc' key, attached to hostlistener
  //keyup(event: KeyboardEvent): void {
  //  if (event.keyCode === 27) {
  //    this.modalService.close(this.modalId, true);
  //  }
  //}

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.registerModal(this);
    this.modalTitle = 'Confirmation';
  }

  close(closeBtnText :string, checkBlocking :boolean = false): void {
    this.closeBtnValue = closeBtnText;
    this.modalService.close(this.modalId, checkBlocking);
  }
}
