import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ServiciosService } from 'app/main/controller/servicios.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent
{
    id='';
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        public json: ServiciosService,
    private router:Router,
    private route:ActivatedRoute
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    }

    ngOnInit() {
       /* this.id=this.route.snapshot.paramMap.get('id');
        console.log("id: ", this.id)

        this.json.disparadorFavoritos.emit({
            data:this.id
        })
      */
      }
}
