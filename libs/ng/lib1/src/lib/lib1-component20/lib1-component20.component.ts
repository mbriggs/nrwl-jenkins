
        import { Component, OnInit } from '@angular/core';
        import { SHARED_CONST } from '@happyorg/shared-utils';

        @Component({
          selector: 'happyorg-lib1-component20',
          templateUrl: './lib1-component20.component.html',
          styleUrls: ['./lib1-component20.component.css']
        })
        export class Lib1Component20Component implements OnInit {
          sharedConst = SHARED_CONST;
        
          constructor() { }
        
          ngOnInit() {
          }
        
        }        
        