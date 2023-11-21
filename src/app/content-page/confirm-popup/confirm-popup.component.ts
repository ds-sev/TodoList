import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { ButtonModule } from 'primeng/button'
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api'

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  imports: [CommonModule, ToastModule, ConfirmPopupModule, ButtonModule],
  templateUrl: './confirm-popup.component.html',
  styleUrl: './confirm-popup.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ConfirmPopupComponent implements OnInit {

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "You have accepted"
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected"
        });
      }
    });
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
  }





}
