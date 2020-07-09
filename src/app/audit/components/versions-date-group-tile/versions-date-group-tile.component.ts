import { Component, OnInit, Input } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-versions-date-group-tile',
  templateUrl: './versions-date-group-tile.component.html',
  styleUrls: ['./versions-date-group-tile.component.scss']
})
export class VersionsDateGroupTileComponent implements OnInit {
  faCaretDown = faCaretDown;
  faSpinner = faSpinner;
  faCaretUp = faCaretUp;
  isCollapsed = true;
  isDay = false;
  dataReceived = false;
  @Input() date: any;
  @Input() productId: number;
  @Input() questionId: number;

  innerDates = [];
  constructor() { }

  ngOnInit() {
    if (this.date.name === 'Today' || this.date.name === 'Yesterday' || this.date.name.includes('Last')) {
      this.isDay = true;
    }
    this.innerDates = this.date.value;
  }

  receiveData($event: boolean) {
    this.dataReceived = $event;
  }

}
