import { inject, Injectable } from '@angular/core'
import { HammerGestureConfig } from '@angular/platform-browser'
import * as Hammer from 'hammerjs'
import { Platform } from '@angular/cdk/platform'

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {

  overrides = <any>{
    swipe: {direction: Hammer.DIRECTION_HORIZONTAL},
    pinch: {enable: false},
    rotate: {enable: false}
  }

  platform = inject(Platform)

  buildHammer(element: HTMLElement) {
    return new Hammer(element, {
      touchAction: 'auto',
      inputClass: this.platform.IOS || this.platform.ANDROID ? Hammer.TouchInput : Hammer.PointerEventInput,
      // inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
      recognizers: [
        [
          Hammer.Swipe,
          {
            direction: Hammer.DIRECTION_HORIZONTAL,
          },
        ],
      ],
    })
  }
}
