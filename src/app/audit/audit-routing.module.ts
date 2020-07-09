import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from '../shared/services/auth/auth-guard.service';

import { ViewProductsComponent } from './containers/view-products/view-products.component';
import { ViewPhasesComponent } from './containers/view-phases/view-phases.component';
import { ViewQuestionsComponent } from './containers/view-questions/view-questions.component';
import { ViewEvidenceHistoryComponent } from './containers/view-evidence-history/view-evidence-history.component';

const routes: Routes = [
  {
    path: 'products',
    component: ViewProductsComponent,
  },
  {
    path: 'products/:product-id/phases',
    component: ViewPhasesComponent,
    canActivate : [AuthGuard]
  },
  {
    path:
      'products/:product-id/phases/:product-phase-id/knowledge-areas/:knowledge-area-id/question',
    component: ViewQuestionsComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'products/:product-id/phases/:product-phase-id/knowledge-areas/:knowledge-area-id/question/:question-id/evidence/versions',
    component: ViewEvidenceHistoryComponent,
    canActivate : [AuthGuard]
  },
  { path: '**',
  component: ViewProductsComponent,
  canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRoutingModule {}
