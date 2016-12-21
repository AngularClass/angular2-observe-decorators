# Update: will be obsolete once [angular/issues/13248](https://github.com/angular/angular/issues/13248#issuecomment-268563351) is merged and released


<p align="center">
  <a href="http://courses.angularclass.com/courses/angular-2-fundamentals" target="_blank">
    <img width="438" alt="Angular 2 Fundamentals" src="https://cloud.githubusercontent.com/assets/1016365/17200649/085798c6-543c-11e6-8ad0-2484f0641624.png">
  </a>
</p>

___

# Reactive Angular 2 Observe Decorators
Reactive Angular 2 Observe Decorators by @AngularClass

Reactive Observe Decorators  
`@ObserveViewChild`  
`@ObserveViewChildren`  
`@ObserveContentChild`  
`@ObserveContentChildren`  


All you need to do is set these values to an `EventEmitter` instance for example.

```typescript
//normal component with @Output event
@Component({
  selector: 'incrementer',
  template: `
  <div>
    <button (click)="increments.emit(1)">increment</button>
  </div>`
})
class Incrementer {
  @Output() increments = new EventEmitter();
}


@Component({
  selector: 'angularclass-app',
  directives: [ Incrementer ],
  template: `
    <div>
      <h4>Child Total Count: {{ counter }}</h4>
      <incrementer></incrementer>
      <button #decrement>decrement</button>
    </div>
  `
})
export class AngularclassApp {
  //query and listen to component output
  @ObserveViewChild(Incrementer) increments = new EventEmitter(); // same as ViewChild but you can use it now as an EventEmitter
  
  //query and listen to a DOM element
  @ObserveViewChild('decrement', 'click') decrements = new EventEmitter();


}
```
we also get redux for free


```typescript
//normal component with @Output event
@Component({
  selector: 'incrementer',
  template: `
  <div>
    <button (click)="increments.emit(1)">increment</button>
  </div>`
})
class Incrementer {
  @Output() increments = new EventEmitter();
}


@Component({
  selector: 'angularclass-app',
  template: `
    <div>
      <h4>Total Count: {{ counterChange }}</h4>
      <incrementer></incrementer>
      <button #decrement>decrement</button>
    </div>
  `,
  directives: [Incrementer]
})
export class AngularclassApp {
  //query and listen to component output
  @ObserveViewChild(Incrementer) increments = new EventEmitter();
  
  //query and listen to a DOM element
  @ObserveViewChild('decrement', 'click') decrements = new EventEmitter();

  // Notice how we're able to just return an Observable
  counterChange = Observable.merge(
    this.increments,
    this.decrements.mapTo(-1)
  )
  .startWith(0)
  .scan((total, value) => total + value, 0);
    

}
```

## Credits
[Rob Wormald](https://github.com/robwormald) from the Angular team and ngrx team [Proposal: Support declarative binding from View events to Observables](https://github.com/angular/angular/issues/4062)

___

enjoy — **AngularClass**

<br><br>

[![AngularClass](https://cloud.githubusercontent.com/assets/1016365/9863770/cb0620fc-5af7-11e5-89df-d4b0b2cdfc43.png  "Angular Class")](https://angularclass.com)
##[AngularClass](https://angularclass.com)
> Learn AngularJS, Angular 2, and Modern Web Development from the best.
> Looking for corporate Angular training, want to host us, or Angular consulting? patrick@angularclass.com

___

Apache-2.0
