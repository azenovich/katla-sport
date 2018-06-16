import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSectionService } from '../services/hive-section.service';
import { HiveSection } from '../models/hive-section';
import { HiveService } from '../services/hive.service';
import { HiveListItem } from '../models/hive-list-item';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.scss']
})
export class HiveSectionFormComponent implements OnInit {

  hiveSection = new HiveSection(0, "", "", null, false, "");
  hives: HiveListItem[];
  hiveId: number;
  existed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveSectionService: HiveSectionService,
    private hiveService: HiveService
  ) { }

  ngOnInit() {
    this.hiveService.getHives()
    .subscribe(h => this.hives = h);

    this.route.params.subscribe(p => {
      if (p['id'] === undefined) return;
      this.initHiveSection(p['id']);
      this.existed = true;
    });
  }

  onCancel() {
    this.navigateToHiveSections();
  }

  onSubmit() {
    if (this.existed) {
      this.hiveSectionService.updateHiveSection(this.hiveSection)
        .subscribe(s => {
          this.hiveId = this.hiveSection.hiveId;
          this.navigateToHiveSections();
        });
    }
    else {
      this.hiveSectionService.addHiveSection(this.hiveSection)
        .subscribe(s => {
          this.hiveId = this.hiveSection.hiveId;
          this.navigateToHiveSections();
        });
    }
  }

  onDelete() {
    this.setStatus(true);
  }

  onUndelete() {
    this.setStatus(false);
  }

  onPurge() {
    this.hiveSectionService
      .deleteHiveSection(this.hiveSection.id)
      .subscribe(s => this.navigateToHiveSections());
  }

  private initHiveSection(hiveSectionId: number) {
    this.hiveSectionService
      .getHiveSection(hiveSectionId)
      .subscribe(s => {
        this.hiveSection = s;
        this.hiveId = this.hiveSection.hiveId;
      });
  }

  private navigateToHiveSections() {
    if (this.hiveId === undefined) {
      this.router.navigate(['/hives']);
    } 
    else {
      this.router.navigate([`/hive/${this.hiveId}/sections`]);
    }
  }

  private setStatus(deletedStatus: boolean) {
    this.hiveSectionService
      .setHiveSectionStatus(this.hiveSection.id, deletedStatus)
      .subscribe(s => this.hiveSection.isDeleted = deletedStatus);
  }
}
