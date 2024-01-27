import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForgeHandlerService } from './forge-handler.service';
import { ForgeTalentComponent } from './forge-talent/forge-talent.component';
import { TopBarModule } from '../../shared/modules/top-bar/top-bar.module';
import { QueryOutputModule } from '../../shared/modules/query-output/query-output.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorButtonsModule } from '@keira-shared/modules/editor-buttons/editor-buttons.module';
import { IconModule } from '@keira-shared/modules/icon/icon.module';
import { AreaSelectorModule } from '@keira-shared/modules/selectors/area-selector/area-selector.module';
import { CreatureSelectorModule } from '@keira-shared/modules/selectors/creature-selector/creature-selector.module';
import { FactionSelectorModule } from '@keira-shared/modules/selectors/faction-selector/faction-selector.module';
import { FlagsSelectorModule } from '@keira-shared/modules/selectors/flags-selector/flags-selector.module';
import { GameobjectSelectorModule } from '@keira-shared/modules/selectors/gameobject-selector/gameobject-selector.module';
import { ItemSelectorModule } from '@keira-shared/modules/selectors/item-selector/item-selector.module';
import { QuestSelectorModule } from '@keira-shared/modules/selectors/quest-selector/quest-selector.module';
import { SingleValueSelectorModule } from '@keira-shared/modules/selectors/single-value-selector/single-value-selector.module';
import { SkillSelectorModule } from '@keira-shared/modules/selectors/skill-selector/skill-selector.module';
import { SpellSelectorModule } from '@keira-shared/modules/selectors/spell-selector/spell-selector.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { SelectQuestModule } from '../quest/select-quest/select-quest.module';

const components = [ForgeTalentComponent];

@NgModule({
  declarations: components,
  exports: components,
  providers: [ForgeHandlerService],
  imports: [
    SelectQuestModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TopBarModule,
    QueryOutputModule,
    NgxDatatableModule,
    TooltipModule,
    ToastrModule,
    EditorButtonsModule,
    CreatureSelectorModule,
    GameobjectSelectorModule,
    FlagsSelectorModule,
    SingleValueSelectorModule,
    SpellSelectorModule,
    FactionSelectorModule,
    SkillSelectorModule,
    QuestSelectorModule,
    ItemSelectorModule,
    IconModule,
    CollapseModule,
    TranslateModule,
    AreaSelectorModule,
  ],
})
export class ForgeModule {}
