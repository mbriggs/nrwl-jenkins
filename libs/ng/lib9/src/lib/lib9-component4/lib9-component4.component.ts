
        import { Component, OnInit } from '@angular/core';
        import { SHARED_CONST } from '@happyorg/shared-utils';

        @Component({
          selector: 'happyorg-lib9-component4',
          templateUrl: './lib9-component4.component.html',
          styleUrls: ['./lib9-component4.component.css']
        })
        export class Lib9Component4Component implements OnInit {
          sharedConst = SHARED_CONST;
        
          constructor() { }
        
          ngOnInit() {
          }
        
        }        
        