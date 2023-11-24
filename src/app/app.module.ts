import { NgModule } from '@angular/core'
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HeaderComponent } from './header/header.component'
import { MyHammerConfig } from './shared/classes/my-hammer.config'
import { ToastModule } from 'primeng/toast'
import { ConfirmationService, MessageService } from 'primeng/api'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    BrowserAnimationsModule,
    HeaderComponent,
    HammerModule,
    ToastModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    ToastModule,
    ConfirmationService,
    MessageService
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
