import { Injectable } from '@angular/core';
import { MultiRowEditorService } from '@keira-abstract/service/editors/multi-row-editor.service';
import { MysqlQueryService } from '@keira-shared/services/mysql-query.service';
import { QuestPoI, QUEST_POI_ID, QUEST_POI_ID_2, QUEST_POI_TABLE } from '@keira-shared/types/quest-poi.type';
import { ToastrService } from 'ngx-toastr';
import { QuestHandlerService } from '../quest-handler.service';

@Injectable()
export class QuestPoIService extends MultiRowEditorService<QuestPoI> {
  /* istanbul ignore next */ // because of: https://github.com/gotwarlost/istanbul/issues/690
  constructor(
    protected handlerService: QuestHandlerService,
    readonly queryService: MysqlQueryService,
    protected toastrService: ToastrService,
  ) {
    super(QuestPoI, QUEST_POI_TABLE, QUEST_POI_ID, QUEST_POI_ID_2, handlerService, queryService, toastrService);
  }
}
