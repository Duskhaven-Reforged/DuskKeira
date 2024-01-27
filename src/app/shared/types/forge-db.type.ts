import { TableRow } from './general';

export const FORGE_TABLE = 'forge_talents';
export const FORGE_TABLE_ID = 'spellid';

export class ForgeTalents extends TableRow {
  spellid: number = 0;
  talentTabId: number = 0;
  columnIndex: number = 0;
  rowIndex: number = 0;
  rankCost: number = 0;
  minLevel: number = 0;
  talentType: number = 0;
  numberRank: number = 0;
  preReqType: number = 0;
  tabPointReq: number = 0;
}
