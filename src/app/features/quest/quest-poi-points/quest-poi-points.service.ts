import { Injectable } from '@angular/core';
import { MultiRowEditorService } from '@keira-abstract/service/editors/multi-row-editor.service';
import { MysqlQueryService } from '@keira-shared/services/mysql-query.service';
import {
  QuestPoIPoints,
  QUEST_POI_POINTS_TABLE,
  QUEST_POI_POINTS_ID,
  QUEST_POI_POINTS_ID_2,
} from '@keira-shared/types/quest-poi-points.type';
import { ToastrService } from 'ngx-toastr';
import { QuestHandlerService } from '../quest-handler.service';

@Injectable()
export class QuestPoIPointsService extends MultiRowEditorService<QuestPoIPoints> {
  /* istanbul ignore next */ // because of: https://github.com/gotwarlost/istanbul/issues/690
  constructor(
    protected handlerService: QuestHandlerService,
    readonly queryService: MysqlQueryService,
    protected toastrService: ToastrService,
  ) {
    super(QuestPoIPoints, QUEST_POI_POINTS_TABLE, QUEST_POI_POINTS_ID, QUEST_POI_POINTS_ID_2, handlerService, queryService, toastrService);
  }
}
