
        import { Component, OnInit } from '@angular/core';
        import { SHARED_CONST } from '@happyorg/shared-utils';

        @Component({
          selector: 'happyorg-lib1-component2',
          templateUrl: './lib1-component2.component.html',
          styleUrls: ['./lib1-component2.component.css']
        })
        export class Lib1Component2Component implements OnInit {
          sharedConst = SHARED_CONST;
        
          constructor() { }
        
          ngOnInit() {
          }
        
        }        
        