import { createConnection, getConnectionManager } from 'typeorm';
import { dbConfig } from '../../../config/database';
import 'mysql';
import { User } from './entity/user';
import { Organization } from './entity/organization';
import { Domain } from './entity/domain';
import { Evidence } from './entity/evidence';
import { KnowledgeArea } from './entity/knowledge_area';
import { Phase } from './entity/phase';
import { Product } from './entity/product';
import { Question } from './entity/question';
import { Revision } from './entity/revision';
import { ProductPhase } from './entity/product_phase';
import { AuditDetail } from './entity/audit_detail';

export async function initMysql() {
  try {
    const con = await createConnection({
      type: 'mysql',
      host: dbConfig.host,
      port: Number(dbConfig.port),
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [
        User,
        Organization,
        Domain,
        KnowledgeArea,
        Phase,
        Product,
        Question,
        Revision,
        Evidence,
        ProductPhase,
        AuditDetail,
      ],
      synchronize: true,
      logging: false,
    });
    return con;
  } catch (err) {
    if (err) {
      const existentConn = getConnectionManager().get('default');
      return existentConn;
    }
  }
}

export async function initMysql2() {
  try {
    const con = await createConnection({
      type: 'mysql',
      host: dbConfig.host,
      port: Number(dbConfig.port),
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
    });
    return con;
  } catch (err) {
    if (err) {
      const existentConn = getConnectionManager().get('default');
      return existentConn;
    }
  }
}
