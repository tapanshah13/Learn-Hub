import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModulesService } from '../module-service/modules.service';

@Component({
  selector: 'app-module-add',
  templateUrl: './module-add.component.html',
  styleUrls: ['./module-add.component.scss']
})
export class ModuleAddComponent implements OnInit {
  model: any = {};
  ckeditorContent: any;
  enableChapter = true;
  enableExam = true;
  gotIndex = 0;
  header = '';
  loadExamTab = false;
  ModuleTitle = '';
  constructor(public moduleService: ModulesService, private route: ActivatedRoute) {
    this.moduleService.enableModuleChapter.subscribe(result => {
      this.enableChapter = result;
    });
    this.moduleService.enableModuleExam.subscribe(result => {
      this.enableExam = result;
    });
    this.moduleService.selectedIndex.subscribe(result => {
      this.gotIndex = result;
    });
  }

  ngOnInit(): void {
    this.header = this.route.snapshot.params.edit;
    this.ModuleTitle = this.header === 'edit' ? 'Edit Module' : 'Add Module';
    this.loadExamTab = true;
  }
}
