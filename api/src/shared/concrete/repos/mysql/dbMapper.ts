import { Product } from '@models/product';
import { KnowledgeArea } from '@models/knowledge-area';
import { Question } from '@models/question';
import { Phase } from '@models/phase';
import { User } from '@models/user';
import { Organization } from '@models/organization';

export function mapDbItems(result: any, mapper: any): any {
  return Object.keys(result).map(key => {
    return mapper(result[key]);
  });
}
export function productMapper(product: any): Product {
  return {
    id: product.products_id,
    name: product.products_name,
    description: product.products_description,
    createdDate: product.products_createdDate,
  } as Product;
}
export function knowledgeAreaMapper(knowledgeArea: any): KnowledgeArea {
  return {
    id: knowledgeArea.knowledgeArea_id,
    phaseId: knowledgeArea.kknowledgeArea_phaseId,
    name: knowledgeArea.knowledgeArea_name,
    description: knowledgeArea.knowledgeArea_description,
    score: knowledgeArea.knowledgeArea_score,
    url: knowledgeArea.knowledgeArea_url,
  } as KnowledgeArea;
}

export function questionMapper(question: any): Question {
  return {
    id: question.question_id,
    knowledgeAreaId: question.question_knowledgeAreaId,
    revisionId: question.question_revisionId,
    userId: question.question_userId,
    title: question.question_title,
    description: question.question_description,
    version: question.question_version,
    createdDate: question.question_createdDate,
  } as Question;
}

export function phasesMapper(phase: any): Phase {
  return {
    id: phase.product_phase_id,
    productPhaseId: phase.product_phase_id,
    phaseId: phase.phases_id,
    name: phase.phases_name,
    description: phase.phases_description,
    score: phase.product_phase_score,
  } as Phase;
}

export function evidenceMapper(evidence: any) {
  return {
    id: evidence.evidence_id,
    content: evidence.evidence_content,
    status: evidence.evidence_status,
    version: evidence.evidence_version,
    createdDate: evidence.evidence_createdDate,
    firstName: evidence.users_firstName,
    email: evidence.users_email,
    lastName: evidence.users_lastName,
    count: evidence.evidence_count,
  };
}

export function userMapper(user: any): User {
  return {
    id: user.users_id,
    organizationId: user.users_organizationId,
    firstName: user.users_firstName,
    lastName: user.users_lastName,
    email: user.users_email,
    phoneNumber: user.users_phoneNumber,
    createdDate: user.users_createdDate,
    isAdmin: user.users_isAdmin,
  } as User;
}

export function organizationMapper(org: any): Organization {
  return {
    id: org.organizations_id,
    name: org.organizations_name,
    email: org.organizations_email,
    createdDate: org.organizations_createdDate,
  } as Organization;
}

export function domainMapper(org: any) {
  return {
    organizationId: org.domain_organizationId,
  };
}

export function evidenceDateMapper(evidence: any) {
  const mapDates: any = [];
  const reference: any = [];
  Object.keys(evidence).map(key => {
    const x = new Date(evidence[key].evidence_createdDate).toLocaleDateString();

    if (reference.includes(x)) {
      mapDates.find((date: any) => {
        if (date['name'] === x) {
          date['value'].push({
            id: evidence[key].evidence_id,
            firstName: evidence[key].users_firstName,
            lastName: evidence[key].users_lastName,
          });
        }
      });
    } else {
      reference.push(x);
      const obj = {
        name: x,
        value: [
          {
            id: evidence[key].evidence_id,
            firstName: evidence[key].users_firstName,
            lastName: evidence[key].users_lastName,
          },
        ],
      };
      mapDates.push(obj);
    }
  });
  return mapDates;
}

export function phaseScoreMapper(result1: any, result2: any) {
  const score: any = [];
  for (const answer of result1) {
    for (const question of result2) {
      if (answer.knowledgeAreaId === question.knowledgeArea_id) {
        const obj = {
          knowledgeId: answer.knowledgeAreaId,
          answerCount: answer.AnswerCount,
          questionCount: question.QuestionCount,
        };
        score.push(obj);
      }
    }
  }
  return score;
}

export function productScoreMapper(result1: any, result2: any) {
  const score: any = [];
  const obj = {
    answerCount: result1[0].AnswerCount,
    questionCount: result2[0].QuestionCount,
  };
  score.push(obj);
  return score;
}
