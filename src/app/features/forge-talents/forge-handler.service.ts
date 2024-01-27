import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HandlerService } from '@keira-abstract/service/handlers/handler.service';
import { FORGE_TABLE, ForgeTalents } from '@keira-shared/types/forge-db.type';

@Injectable()
export class ForgeHandlerService extends HandlerService<ForgeTalents> {
  get isForgeUnsaved(): boolean {
    return this.statusMap[FORGE_TABLE];
  }

  protected _statusMap = {
    [FORGE_TABLE]: false,
  };

  /* istanbul ignore next */ // because of: https://github.com/gotwarlost/istanbul/issues/690
  constructor(protected router: Router) {
    super('forge/forge-talents', router);
  }
}
