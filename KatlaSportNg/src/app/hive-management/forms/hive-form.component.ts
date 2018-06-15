import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveService } from '../services/hive.service';
import { Hive } from '../models/hive';

@Component({
  selector: 'app-hive-form',
  templateUrl: './hive-form.component.html',
  styleUrls: ['./hive-form.component.scss']
})
export class HiveFormComponent implements OnInit {

  hive = new Hive(0, "", "", "", false, "");
  existed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveService: HiveService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p['id'] === undefined) return;
      this.hiveService.getHive(p['id']).subscribe(h => this.hive = h);
      this.existed = true;
    });
  }

  navigateToHives() {
    this.router.navigate(['/hives']);
  }

  onCancel() {
    this.navigateToHives();
  }
  
  onSubmit() {
    if (this.existed) {
      this.hiveService.updateHive(this.hive).subscribe(h => this.navigateToHives());
    }
    else {
      this.hiveService.addHive(this.hive).subscribe(h => this.navigateToHives());
    }
  }

  onDelete() {
    this.setStatus(true);
  }

  onUndelete() {
    this.setStatus(false);
  }

  onPurge() {
    this.hiveService.deleteHive(this.hive.id).subscribe(h => this.navigateToHives());
  }

  private setStatus(deletedStatus: boolean) {
    this.hiveService.setHiveStatus(this.hive.id, deletedStatus).subscribe(h => this.hive.isDeleted = deletedStatus);
  }
}
