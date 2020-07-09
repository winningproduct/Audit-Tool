import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EvidenceApiService } from '@shared/services/api/evidence.service';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-versions-date-detail-tile',
  templateUrl: './versions-date-detail-tile.component.html',
  styleUrls: ['./versions-date-detail-tile.component.scss']
})
export class VersionsDateDetailTileComponent implements OnInit {

  faRedo = faRedo;
  faCaretDown = faCaretDown;

  @Input() versionDetail: any;
  @Input() productId: number;
  @Input() questionId: number;
  evidenceId: number;
  editDetails: any;
  isCollapsed = true;
  pipe = new DatePipe('en-US');

  constructor(
    private evidenceService: EvidenceApiService
  ) { }

  ngOnInit() {
  }

  revert(evidenceId: number) {
    this.evidenceService.setEvidenceId(evidenceId);
  }

}
