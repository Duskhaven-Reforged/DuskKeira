import { Component } from '@angular/core';
import { MultiRowEditorComponent } from '@keira-abstract/components/editors/multi-row-editor.component';
import { QuestPoIPoints } from '@keira-shared/types/quest-poi-points.type';
import { QuestHandlerService } from '../quest-handler.service';
import { QuestPreviewService } from '../quest-preview/quest-preview.service';
import { QuestPoIPointsService } from './quest-poi-points.service';

@Component({
  selector: 'keira-quest-poi-points',
  templateUrl: './quest-poi-points.component.html',
  styleUrls: ['./quest-poi-points.component.scss'],
})
export class QuestPoIPointsComponent extends MultiRowEditorComponent<QuestPoIPoints> {
  /* istanbul ignore next */ // because of: https://github.com/gotwarlost/istanbul/issues/690
  constructor(
    public editorService: QuestPoIPointsService,
    public handlerService: QuestHandlerService,
    readonly questPreviewService: QuestPreviewService,
  ) {
    super(editorService, handlerService);
  }
}
