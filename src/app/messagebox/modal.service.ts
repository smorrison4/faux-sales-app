// From http://www.brianchildress.co/posts/Angular-2-Modal-Service/ 6/3/2018
import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';

// ModalService - Service used to interact with the Modal Component
// @param { String } modalId The id of the modal to close
@Injectable()
export class ModalService {
  private modals: Array<ModalComponent>;

  constructor() {
    this.modals = [];
  }

  close(modalId: string, checkBlocking = false): void {
    let modal = this.findModal(modalId);
    if (modal) {
      if (checkBlocking) {
        return;
      }
      setTimeout(() => {
        modal.isOpen = false;
      }, 250);
    }
  }

  findModal(modalId: string): ModalComponent {
    for (let modal of this.modals) {
    if (modal.modalId === modalId) {
        return modal;
      }
    }
    return null;
  }

  // set toastrClose in milliseconds, or else 0 or blank to keep open indefineitely
  open(modalId: string, toastrClose: number = 0): void {
    let modal = this.findModal(modalId);
    if (modal) {
      setTimeout(() => {
        modal.isOpen = true;
        if( toastrClose > 0)
          setTimeout(() => {
            modal.isOpen = false;
          }, toastrClose);
      }, 250);
    }
}

  // registerModal - Registers all modal components being used on initialization
  registerModal(newModal: ModalComponent): void {
    let modal = this.findModal(newModal.modalId);

    // Delete existing to replace the modal
    if (modal) {
      this.modals.splice(this.modals.indexOf(modal), 1);
    }
    this.modals.push(newModal);
  }
}