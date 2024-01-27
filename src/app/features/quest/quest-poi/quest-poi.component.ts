import { Component } from '@angular/core';
import { MultiRowEditorComponent } from '@keira-abstract/components/editors/multi-row-editor.component';
import { QuestHandlerService } from '../quest-handler.service';
import { QuestPreviewService } from '../quest-preview/quest-preview.service';
import { QuestPoIService } from './quest-poi.service';
import { QuestPoI } from '@keira-shared/types/quest-poi.type';
import { MAPID } from '@keira-shared/constants/options/mapid';

@Component({
  selector: 'keira-quest-poi',
  templateUrl: './quest-poi.component.html',
  styleUrls: ['./quest-poi.component.scss'],
})
export class QuestPoIComponent extends MultiRowEditorComponent<QuestPoI> {
  /* istanbul ignore next */ // because of: https://github.com/gotwarlost/istanbul/issues/690

  readonly MAPID = MAPID;

  constructor(
    public editorService: QuestPoIService,
    public handlerService: QuestHandlerService,
    readonly questPreviewService: QuestPreviewService,
  ) {
    super(editorService, handlerService);
  }
}
