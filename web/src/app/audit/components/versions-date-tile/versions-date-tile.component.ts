import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EvidenceApiService } from '@shared/services/api/evidence.service';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-versions-date-tile',
  templateUrl: './versions-date-tile.component.html',
  styleUrls: ['./versions-date-tile.component.scss']
})
export class VersionsDateTileComponent implements OnInit {
  faRedo = faRedo;
  faCaretDown = faCaretDown;
  faSpinner = faSpinner;
  getVersions = false;
  @Input() isDay: boolean;
  @Input() innerDate: any;
  @Input() productId: number;
  @Input() questionId: number;
  @Output() dataEvent = new EventEmitter<boolean>();
  evidenceId: number;
  versionDetails: any;
  isCollapsed = true;
  pipe = new DatePipe('en-US');

  constructor(
    private evidenceService: EvidenceApiService
  ) { }

  async ngOnInit() {
    if (this.isDay) {
      await this.getEvidenceByDate(this.innerDate);
    }
  }

  async getEvidenceByDate(date: string) {
    if (this.isCollapsed) {
    this.getVersions = true;
    const format = 'yyyy-MM-dd';
    const myFormattedDate = this.pipe.transform(date, format, 'short');
    this.versionDetails = await this.evidenceService.getEvidenceVersionsByDate(this.productId, this.questionId, myFormattedDate);
    }
    this.getVersions = false;
    this.isCollapsed = !this.isCollapsed;
    this.dataEvent.emit(true);
  }

}
