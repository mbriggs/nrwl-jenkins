
        import { Component, OnInit } from '@angular/core';
        import { SHARED_CONST } from '@happyorg/shared-utils';

        @Component({
          selector: 'happyorg-lib14-component1',
          templateUrl: './lib14-component1.component.html',
          styleUrls: ['./lib14-component1.component.css']
        })
        export class Lib14Component1Component implements OnInit {
          sharedConst = SHARED_CONST;
        
          constructor() { }
        
          ngOnInit() {
          }
        
        }        
        