import { HiveSection } from './../models/hive-section';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSectionListItem } from '../models/hive-section-list-item';
import { HiveService } from '../services/hive.service';
import { HiveSectionService } from '../services/hive-section.service';

@Component({
  selector: 'app-hive-section-list',
  templateUrl: './hive-section-list.component.html',
  styleUrls: ['./hive-section-list.component.scss']
})
export class HiveSectionListComponent implements OnInit {

  hiveId: number;
  hiveSections: Array<HiveSectionListItem>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveService: HiveService,
    private hiveSectionService: HiveSectionService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.hiveId = p['id'];
      this.getHiveSections();
    })
  }

  getHiveSections() {
    this.hiveService.getHiveSections(this.hiveId).subscribe(s => this.hiveSections = s);
  }

  onDelete(hiveSectionId: number) {
    var hiveSection = this.findById(hiveSectionId);
    this.setStatus(hiveSection, true);
  }

  onUndelete(hiveSectionId: number) {
    var hiveSection = this.findById(hiveSectionId);
    this.setStatus(hiveSection, false);
  }

  private findById(hiveSectionId: number): HiveSectionListItem {
    return this.hiveSections.find(hv => hv.id == hiveSectionId);
  }

  private setStatus(hiveSection: HiveSectionListItem, deletedStatus: boolean) {
    this.hiveSectionService.setHiveSectionStatus(hiveSection.id, deletedStatus).subscribe(c => hiveSection.isDeleted = deletedStatus);;
  }
}
