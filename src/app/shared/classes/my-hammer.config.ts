import { Injectable } from '@angular/core'
import { HammerGestureConfig } from '@angular/platform-browser'
import * as Hammer from 'hammerjs'

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: {direction: Hammer.DIRECTION_HORIZONTAL},
    pinch: {enable: false},
    rotate: {enable: false}
  }

  buildHammer(element: HTMLElement) {
    return new Hammer(element, {
      touchAction: 'auto',
      // inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
      inputClass: Hammer.TouchInput,
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
