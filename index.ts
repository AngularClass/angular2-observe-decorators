/*














  This is what I call "yolo code"
  where I'm hacking it together just to get it to work.
  A refactor is planned later after the initial release.



















*/
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewChildren,
  ContentChild,
  ContentChildren
} from '@angular/core'

type Type = Function;


export const ObserveInput = (inputProp?: string) => {
  return (target, prop) => {
    target.__value = target.__value || {};
    target.__ee = target.__ee || {};
    target.__sub = target.__sub || {};

    //if (inputProp) {
      //Object.defineProperty(target, inputProp, {
        //set(value){
          //target.__ee[prop].next(value);
          //target[inputProp || prop] = value
        //},
        //get() {
          //return target[inputProp || prop];
        //}
      //});
    //}


    Object.defineProperty(target, prop, {
      set(value) {
        if (value === undefined) return value;
        if (value instanceof EventEmitter || value instanceof BehaviorSubject) {
          target.__ee[prop] = value;
          target.__sub[prop] = true;
          target[inputProp || prop] = value.value;
          return
        }
        //console.log('value', value)
        target.__ee[prop].next(value);
        target[inputProp || prop] = value

      },
      get(){
        if (target.__sub[prop]) {
          target.__sub[prop] = false;
          return target.__ee[prop];
        }
        return target[inputProp || prop];
      }
    });

    let l =  Input(inputProp)(target, inputProp || prop);
  }
}



export const ObserveViewChild = (compOrType: Type | string, eventName?: string, options?:any ) => {
  return (target, prop) => {
    target.__listeners = target.__listeners || {};
    target.__ee = target.__ee || {};
    target.__sub = target.__sub || {};

    Object.defineProperty(target, prop, {
      set(value) {
        if (value === undefined) return value;
        if (value instanceof EventEmitter) {
          target.__ee[prop] = value;
          target.ngOnDestroy = target.ngOnDestroy ? (() => {
            if (target.__sub[prop] && target.__sub[prop].unsubscribe) {
              target.__sub[prop].unsubscribe();
            }
            target.__sub[prop] = null;
            target.ngOnDestroy();
          }) : (() => {
            if (target.__sub[prop] && target.__sub[prop].unsubscribe) {
              target.__sub[prop].unsubscribe();
            }
            target.__sub[prop] = null;
          })
          return
        }
        if (typeof compOrType === 'string'){
          console.log(value)
          if (target.__ee[prop]) {
            target.__sub[prop] = Observable.fromEvent(value.nativeElement, eventName).subscribe(target.__ee[prop]);
            return;
          }
          target.__listeners[prop] = Observable.fromEvent(value.nativeElement, eventName);
          return;
        }
        eventName = eventName || prop;

        if (target.__ee[prop]) {
          target.__sub[prop] = Observable.from(value[eventName]).subscribe(target.__ee[prop]);
          return;
        }
        target.__listeners[prop] = Observable.from(value[eventName]);
      },
      get(){
        return target.__listeners[prop] || target.__ee[prop];
      }
    });

    let l =  ViewChild(compOrType)(target, prop);
  }
}


export const ObserveContentChild = (compOrType: Type | string, eventName?: string, options?:any ) => {
  return (target, prop) => {
    target.__listeners = target.__listeners || {};
    target.__ee = target.__ee || {};
    target.__sub = target.__sub || {};

    Object.defineProperty(target, prop, {
      set(value) {
        if (value === undefined) return value;
        if (value instanceof EventEmitter) {
          target.__ee[prop] = value;
          target.ngOnDestroy = target.ngOnDestroy ? (() => {
            if (target.__sub[prop] && target.__sub[prop].unsubscribe) {
              target.__sub[prop].unsubscribe();
            }
            target.__sub[prop] = null;
            target.ngOnDestroy();
          }) : (() => {
            if (target.__sub[prop] && target.__sub[prop].unsubscribe) {
              target.__sub[prop].unsubscribe();
            }
            target.__sub[prop] = null;
          })
          return
        }
        if (typeof compOrType === 'string'){
          console.log(value)
          if (target.__ee[prop]) {
            target.__sub[prop] = Observable.fromEvent(value.nativeElement, eventName).subscribe(target.__ee[prop]);
            return;
          }
          target.__listeners[prop] = Observable.fromEvent(value.nativeElement, eventName);
          return;
        }
        eventName = eventName || prop;

        if (target.__ee[prop]) {
          target.__sub[prop] = Observable.from(value[eventName]).subscribe(target.__ee[prop]);
          return;
        }
        target.__listeners[prop] = Observable.from(value[eventName]);
      },
      get(){
        return target.__listeners[prop] || target.__ee[prop];
      }
    });

    let l =  ContentChild(compOrType)(target, prop);
  }
}

export const ObserveViewChildren = (compOrType: Type | string, eventName?: string, options?:any ) => {
  return (target, prop) => {
    target.__listeners = target.__listeners || {};
    target.__ee = target.__ee || {};
    target.__sub = target.__sub || {};

    Object.defineProperty(target, prop, {
      set(value) {
        if (value === undefined) return value;
        if (value instanceof EventEmitter) {
          target.__ee[prop] = value;
          target.ngOnDestroy = target.ngOnDestroy ? (() => {
            if (target.__sub[prop] && target.__sub[prop].unsubscribe) {
              target.__sub[prop].unsubscribe();
            }
            target.__sub[prop] = null;
            target.ngOnDestroy();
          }) : (() => {
            if (target.__sub[prop] && target.__sub[prop].unsubscribe) {
              target.__sub[prop].unsubscribe();
            }
            target.__sub[prop] = null;
          })
          return
        }
        if (typeof compOrType === 'string'){
          console.log(value)
          if (target.__ee[prop]) {
            target.__sub[prop] = Observable.fromEvent(value.nativeElement, eventName).subscribe(target.__ee[prop]);
            return;
          }
          target.__listeners[prop] = Observable.fromEvent(value.nativeElement, eventName);
          return;
        }
        eventName = eventName || prop;

        if (target.__ee[prop]) {
          target.__sub[prop] = Observable.from(value[eventName]).subscribe(target.__ee[prop]);
          return;
        }
        target.__listeners[prop] = Observable.from(value[eventName]);
      },
      get(){
        return target.__listeners[prop] || target.__ee[prop];
      }
    });

    let l =  ViewChildren(compOrType)(target, prop);
  }
}
export const ObserveContentChildren = (compOrType: Type | string, eventName?: string, options?:any ) => {
  return (target, prop) => {
    target.__listeners = target.__listeners || {};
    target.__ee = target.__ee || {};
    target.__sub = target.__sub || {};

    Object.defineProperty(target, prop, {
      set(value) {
        if (value === undefined) return value;
        if (value instanceof EventEmitter) {
          target.__ee[prop] = value;
          target.ngOnDestroy = target.ngOnDestroy ? (() => {
            if (target.__sub[prop] && target.__sub[prop].unsubscribe) {
              target.__sub[prop].unsubscribe();
            }
            target.__sub[prop] = null;
            target.ngOnDestroy();
          }) : (() => {
            if (target.__sub[prop] && target.__sub[prop].unsubscribe) {
              target.__sub[prop].unsubscribe();
            }
            target.__sub[prop] = null;
          })
          return
        }
        if (typeof compOrType === 'string'){
          console.log(value)
          if (target.__ee[prop]) {
            target.__sub[prop] = Observable.fromEvent(value.nativeElement, eventName).subscribe(target.__ee[prop]);
            return;
          }
          target.__listeners[prop] = Observable.fromEvent(value.nativeElement, eventName);
          return;
        }
        eventName = eventName || prop;

        if (target.__ee[prop]) {
          target.__sub[prop] = Observable.from(value[eventName]).subscribe(target.__ee[prop]);
          return;
        }
        target.__listeners[prop] = Observable.from(value[eventName]);
      },
      get(){
        return target.__listeners[prop] || target.__ee[prop];
      }
    });

    let l =  ContentChildren(compOrType)(target, prop);
  }
}
