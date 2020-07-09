import { IProductService } from './products/interfaces/product.service.interface';
import API from 'lambda-api';
import 'source-map-support/register';
import { IKnowledgeAreaService } from 'knowledge-areas/interfaces/knowledge-area.service.interface';
import { injectable } from 'inversify';
import { IEvidenceService } from 'evidence/interfaces/evidence.interface';
import { IQuestionService } from '@questions/interfaces/question.service.interface';
import { Evidence } from '@models/evidence';
import { IUserService } from 'users/interfaces/user.service.interface';
import { IOrganizationService } from 'organizations/interfaces/organization.service.interface';
import { IAdminService } from 'admin/interfaces/admin.service.interface';

@injectable()
export class Routes {
  private path = API({ version: 'v1.0', logger: true });
  private productService: IProductService;
  private knowledgeAreaService: IKnowledgeAreaService;
  private evidenceService: IEvidenceService;
  private questionService: IQuestionService;
  private userService: IUserService;
  private adminService: IAdminService;

  constructor(
    _knowledgeAreaService: IKnowledgeAreaService,
    _productService: IProductService,
    _evidenceService: IEvidenceService,
    _questionService: IQuestionService,
    _userService: IUserService,
    _organizationService: IOrganizationService,
    _adminService: IAdminService,
  ) {
    this.productService = _productService;
    this.knowledgeAreaService = _knowledgeAreaService;
    this.evidenceService = _evidenceService;
    this.productService = _productService;
    this.knowledgeAreaService = _knowledgeAreaService;
    this.questionService = _questionService;
    this.userService = _userService;
    this.adminService = _adminService;
    this.initiateApi();
  }
  initiateApi() {
    this.path.get('product/user/:id', async (req, _res) => {
      const userId = Number(req.pathParameters ? req.pathParameters.id : null);
      return await this.productService.getProductsByUser(userId);
    });

    this.path.get('product/:id', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.productService.getProductById(productId);
    });

    this.path.get('product/:id/phases', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.productService.getPhases(productId);
    });

    this.path.get('product/productPhases/:id', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.productService.getProductByProductPhaseId(productId);
    });

    this.path.get('productPhase/:id/knowledgeAreas', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.knowledgeAreaService.getKnowledgeAreaByPhase(productId);
    });

    this.path.get('product/:id/questions/:qid/evidence', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      const questionId = Number(
        req.pathParameters ? req.pathParameters.qid : null,
      );
      return await this.evidenceService.getEvidenceByProjectIdAndQuestionId(
        productId,
        questionId,
      );
    });
    this.path.get('knowledgeArea/:id/questions', async (req, _res) => {
      const knowledgeAreaId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.questionService.getQuestionsByKnowledgeArea(
        knowledgeAreaId,
      );
    });

    this.path.get('knowledgeArea/:id', async (req, _res) => {
      const knowledgeAreaId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.knowledgeAreaService.getKnowledgeAreaById(
        knowledgeAreaId,
      );
    });

    this.path.post('question/:id/evidence', async (req, _res) => {
      const questionId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      const evidence: Evidence = req.body;
      return await this.evidenceService.addEvidenceByQuestionId(
        questionId,
        evidence,
      );
    });

    this.path.post('question/:id/revertEvidence', async (req, _res) => {
      const questionId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      const evidenceId: number = req.body.evidenceId;
      const productId: number = req.body.productId;
      return await this.evidenceService.revertEvidence(
        productId,
        questionId,
        evidenceId,
      );
    });

    this.path.put('question/:id/evidence/:eid', async (req, _res) => {
      const qevidenceId = Number(
        req.pathParameters ? req.pathParameters.eid : null,
      );
      const status: string = req.body.status;
      return await this.evidenceService.updateStatus(qevidenceId, status);
    });

    this.path.get('user/email/:id', async (req, _res) => {
      const email = req.pathParameters ? req.pathParameters.id : '';
      return await this.userService.getOrganizationByUserEmail(email);
    });

    this.path.get('user/product/:id', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.userService.getUsersByProjectId(productId);
    });

    this.path.post('user', async (req, _res) => {
      const user = req.body.user;
      return await this.userService.addUser(user);
    });

    this.path.get('product/:id/productPhase', async (req, _res) => {
      const productPhaseId = req.pathParameters ? req.pathParameters.id : 0;
      return await this.productService.getPhaseByProductPhaseId(
        Number(productPhaseId),
      );
    });

    this.path.get('product/:id/question/:qid/page/:pid', async (req, _res) => {
      const productId = req.pathParameters ? req.pathParameters.id : 0;
      const questionId = req.pathParameters ? req.pathParameters.qid : 0;
      const pageId = req.pathParameters ? req.pathParameters.pid : 0;
      return await this.evidenceService.getVersionsGroupByDate(
        Number(productId),
        Number(questionId),
        Number(pageId),
      );
    });

    this.path.get('evidence/:id', async (req, _res) => {
      const evidenceId = req.pathParameters ? req.pathParameters.id : 0;
      return await this.evidenceService.getEvidenceById(Number(evidenceId));
    });

    this.path.get(
      'product/:id/question/:qid/evidence/date/:did',
      async (req, _res) => {
        const productId = req.pathParameters ? req.pathParameters.id : 0;
        const questionId = req.pathParameters ? req.pathParameters.qid : 0;
        const date = req.pathParameters ? req.pathParameters.did : '';
        return await this.evidenceService.getVersionsByDate(
          Number(productId),
          Number(questionId),
          date,
        );
      },
    );

    this.path.post('authTrigger/user', async (req, _res) => {
      const data = req.body;
      return await this.userService.addUserFromTrigger(data);
    });

    // ADMIN API ROUTES

    this.path.get('admin/products', async (_req, _res) => {
      return await this.adminService.getAllProducts();
    });

    this.path.get('admin/users', async (_req, _res) => {
      return await this.adminService.getAllUsers();
    });

    this.path.get('admin/organizations', async (_req, _res) => {
      return await this.adminService.getAllOrganizations();
    });

    this.path.post('admin/userProducts', async (req, _res) => {
      return await this.adminService.addUserProduct(
        req.body.productId,
        req.body.userId,
      );
    });

    this.path.post('admin/product', async (req, _res) => {
      return await this.adminService.addProduct(req.body);
    });

    // For Progress Bar
    this.path.get('questionCount/knowledgeArea/:id', async (req, _res) => {
      const knowledgeAreaId = req.pathParameters ? req.pathParameters.id : 0;
      return await this.knowledgeAreaService.getKnowledgeAreaScore(
        Number(knowledgeAreaId),
      );
    });

    this.path.get('questionCount/phase/:pid/:id:', async (req, _res) => {
      const productId = req.pathParameters ? req.pathParameters.pid : 0;
      const phaseId = req.pathParameters ? req.pathParameters.id : 0;
      return await this.productService.getPhaseScore(
        Number(productId),
        Number(phaseId),
      );
    });

    this.path.get('questionCount/product/:id', async (req, _res) => {
      const productId = req.pathParameters ? req.pathParameters.id : 0;
      return await this.productService.getProductScore(Number(productId));
    });
  }

  getPath() {
    return this.path;
  }
}
