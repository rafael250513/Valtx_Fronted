import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-popup-registro-actividad',
  templateUrl: './popup-registro-actividad.component.html',
  styleUrls: ['./popup-registro-actividad.component.scss']
})
export class PopupRegistroActividadComponent implements OnInit {
 
  constructor(public popup : MatDialogRef<PopupRegistroActividadComponent>) { }

  ngOnInit(): void {
  }

  onClose(){
    this.popup.close();
  }

}
