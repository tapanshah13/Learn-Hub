import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {
  title: string = '';
  description:string = '';
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title;
    this.description = data.description;
  }

  ngOnInit(): void {}

}
