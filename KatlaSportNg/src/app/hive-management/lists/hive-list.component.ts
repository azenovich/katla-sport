import { Hive } from './../models/hive';
import { Component, OnInit } from '@angular/core';
import { HiveListItem } from '../models/hive-list-item';
import { HiveService } from '../services/hive.service';

@Component({
  selector: 'app-hive-list',
  templateUrl: './hive-list.component.html',
  styleUrls: ['./hive-list.component.scss']
})
export class HiveListComponent implements OnInit {

  hives: HiveListItem[];

  constructor(private hiveService: HiveService) { }

  ngOnInit() {
    this.getHives();
  }

  getHives() {
    this.hiveService.getHives().subscribe(h => this.hives = h);
  }

  onDelete(hiveId: number) {
    var hive = this.findById(hiveId);
    this.setStatus(hive, true);
  }

  onRestore(hiveId: number) {
    var hive = this.findById(hiveId);
    this.setStatus(hive, false);
  }

  private findById(hiveId: number): HiveListItem {
    return this.hives.find(h => h.id == hiveId);
  }

  private setStatus(hive: HiveListItem, deletedStatus: boolean) {
    this.hiveService.setHiveStatus(hive.id, deletedStatus).subscribe(c => hive.isDeleted = deletedStatus);
  }
}
