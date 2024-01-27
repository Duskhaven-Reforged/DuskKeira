import { TableRow } from './general';

export const QUEST_POI_POINTS_TABLE = 'quest_poi_points';
export const QUEST_POI_POINTS_ID = 'QuestID';
export const QUEST_POI_POINTS_ID_2 = 'Idx2';

export class QuestPoIPoints extends TableRow {
  QuestID: number = 0;
  Idx2: number = 0;
  Idx1: number = 0;
  X: number = 0;
  Y: number = 0;
  VerifiedBuild: number = 0;
}
