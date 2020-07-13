import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ngx bootstrap modules import */
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';

/* fontawesome module import */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuditRoutingModule } from './audit-routing.module';
import { AuditComponent } from './audit.component';
import { ViewProductsComponent } from './containers/view-products/view-products.component';
import { ViewPhasesComponent } from './containers/view-phases/view-phases.component';
import { ProductTileComponent } from './components/product-tile/product-tile.component';
import { PhaseTileComponent } from './components/phase-tile/phase-tile.component';
import { ViewQuestionsComponent } from './containers/view-questions/view-questions.component';
import { EvidenceBoxComponent } from './components/evidence-box/evidence-box.component';
import { AvatarModule } from 'ngx-avatar';
import { AuthService } from '@shared/services/auth/auth.service';

/* for drop-downs */
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ViewEvidenceHistoryComponent } from './containers/view-evidence-history/view-evidence-history.component';
import { EvidenceHistoryBoxComponent } from './components/evidence-history-box/evidence-history-box.component';


import { MomentModule } from 'ngx-moment';
import { VersionsDateTileComponent } from './components/versions-date-tile/versions-date-tile.component';
import { VersionsDateGroupTileComponent } from './components/versions-date-group-tile/versions-date-group-tile.component';
import { VersionsTabComponent } from './components/versions-tab/versions-tab.component';
import { VersionsDateDetailTileComponent } from './components/versions-date-detail-tile/versions-date-detail-tile.component';

/* ngx spinner */
import { NgxSpinnerModule } from 'ngx-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { KnowledgeAreaSideBarComponent } from './components/knowledge-area-side-bar/knowledge-area-side-bar.component';

@NgModule({
  declarations: [
    AuditComponent,
    ViewProductsComponent,
    ViewPhasesComponent,
    ProductTileComponent,
    PhaseTileComponent,
    ViewQuestionsComponent,
    EvidenceBoxComponent,
    ViewEvidenceHistoryComponent,
    EvidenceHistoryBoxComponent,
    VersionsDateTileComponent,
    VersionsDateGroupTileComponent,
    VersionsTabComponent,
    VersionsDateDetailTileComponent,
    KnowledgeAreaSideBarComponent,
  ],
  imports: [
    CommonModule,
    AuditRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    FontAwesomeModule,
    HttpClientModule,
    AngularEditorModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    SharedModule,
    TooltipModule.forRoot(),
    MomentModule,
    NgxSpinnerModule,
    InfiniteScrollModule
  ],
  providers: [AuthService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AuditModule {}
