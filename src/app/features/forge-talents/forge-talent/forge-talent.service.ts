import { Injectable } from '@angular/core';
import { MultiRowEditorService } from '@keira-abstract/service/editors/multi-row-editor.service';
import { MysqlQueryService } from '@keira-shared/services/mysql-query.service';
import { ToastrService } from 'ngx-toastr';
import { ForgeHandlerService } from '../forge-handler.service';
import { FORGE_TABLE, FORGE_TABLE_ID, ForgeTalents } from '@keira-shared/types/forge-db.type';

@Injectable()
export class ForgeTalentService extends MultiRowEditorService<ForgeTalents> {
  /* istanbul ignore next */ // because of: https://github.com/gotwarlost/istanbul/issues/690
  constructor(
    protected handlerService: ForgeHandlerService,
    readonly queryService: MysqlQueryService,
    protected toastrService: ToastrService,
  ) {
    super(ForgeTalents, FORGE_TABLE, FORGE_TABLE_ID, FORGE_TABLE_ID, handlerService, queryService, toastrService);
  }
}
