import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-registro-usuario',
  templateUrl: './popup-registro-usuario.component.html',
  styleUrls: ['./popup-registro-usuario.component.scss']
})
export class PopupRegistroUsuarioComponent implements OnInit {

  constructor(public popup : MatDialogRef<PopupRegistroUsuarioComponent>) { }

  ngOnInit(): void {
  }

  onClose(){
    this.popup.close();
  }

}
