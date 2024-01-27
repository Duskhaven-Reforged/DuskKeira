import { Component } from '@angular/core';
import { MultiRowEditorComponent } from '@keira-abstract/components/editors/multi-row-editor.component';
import { MAPID } from '@keira-shared/constants/options/mapid';
import { ForgeTalents } from '@keira-shared/types/forge-db.type';
import { ForgeHandlerService } from '../forge-handler.service';
import { ForgeTalentService } from './forge-talent.service';

@Component({
  selector: 'keira-forge-talent',
  templateUrl: './forge-talent.component.html',
  styleUrls: ['./forge-talent.component.scss'],
})
export class ForgeTalentComponent extends MultiRowEditorComponent<ForgeTalents> {
  /* istanbul ignore next */ // because of: https://github.com/gotwarlost/istanbul/issues/690

  readonly MAPID = MAPID;

  constructor(
    public editorService: ForgeTalentService,
    public handlerService: ForgeHandlerService,
  ) {
    super(editorService, handlerService);
  }
}
