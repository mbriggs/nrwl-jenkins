
        import { Component, OnInit } from '@angular/core';
        import { SHARED_CONST } from '@happyorg/shared-utils';

        @Component({
          selector: 'happyorg-lib10-component8',
          templateUrl: './lib10-component8.component.html',
          styleUrls: ['./lib10-component8.component.css']
        })
        export class Lib10Component8Component implements OnInit {
          sharedConst = SHARED_CONST;
        
          constructor() { }
        
          ngOnInit() {
          }
        
        }        
        