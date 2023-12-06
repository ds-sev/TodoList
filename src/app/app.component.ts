import { Component, OnInit } from '@angular/core'
import { ToastModule } from 'primeng/toast'
import { MessageService, PrimeNGConfig } from 'primeng/api'
import { AuthService } from './shared/services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ToastModule, MessageService, AuthService]
})
export class AppComponent implements OnInit {
  constructor(private config: PrimeNGConfig ) {
  }

  ngOnInit() {
    this.config.setTranslation({
      firstDayOfWeek: 1,
      dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
      dayNamesShort: ["Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"],
      dayNamesMin: ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
      monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
      monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн","Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
      today: 'Сегодня',
      clear: 'Очистить',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk'
    })
  }
}
