
        import { Component, OnInit } from '@angular/core';
        import { SHARED_CONST } from '@happyorg/shared-utils';

        @Component({
          selector: 'happyorg-lib4-component1',
          templateUrl: './lib4-component1.component.html',
          styleUrls: ['./lib4-component1.component.css']
        })
        export class Lib4Component1Component implements OnInit {
          sharedConst = SHARED_CONST;
        
          constructor() { }
        
          ngOnInit() {
          }
        
        }        
        