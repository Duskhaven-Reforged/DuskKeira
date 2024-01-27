import { TableRow } from './general';

export const QUEST_POI_TABLE = 'quest_poi';
export const QUEST_POI_ID = 'QuestID';
export const QUEST_POI_ID_2 = 'id';

export class QuestPoI extends TableRow {
  QuestID: number = 0;
  id: number = 0;
  ObjectiveIndex: number = 0;
  MapID: number = 0;
  WorldMapAreaId: number = 0;
  Floor: number = 0;
  Priority: number = 0;
  Flags: number = 0;
  VerifiedBuild: number = 0;
}
