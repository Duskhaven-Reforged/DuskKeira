import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MysqlQueryService } from '@keira-shared/services/mysql-query.service';
import { MultiRowEditorPageObject } from '@keira-testing/multi-row-editor-page-object';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { TranslateTestingModule } from '@keira-shared/testing/translate-module';
import { ForgeTalentComponent } from './forge-talent.component';
import { ForgeModule } from '../forge.module';
import { ForgeTalents } from '@keira-shared/types/forge-db.type';
import { ForgeHandlerService } from '../forge-handler.service';
// import Spy = jasmine.Spy;

class ForgeTalentPage extends MultiRowEditorPageObject<ForgeTalentComponent> {}

describe('QuestPoIPoints integration tests', () => {
  const ID = 1234;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), ModalModule.forRoot(), RouterTestingModule, ForgeModule, TranslateTestingModule],
    }).compileComponents();
  }));

  function setup(creatingNew: boolean) {
    const originalRow0 = new ForgeTalents();
    const originalRow1 = new ForgeTalents();
    const originalRow2 = new ForgeTalents();
    originalRow0.spellid = originalRow1.spellid = originalRow2.spellid = ID;
    originalRow0.ID = 0;
    originalRow1.ID = 1;
    originalRow2.ID = 2;

    const handlerService = TestBed.inject(ForgeHandlerService);
    handlerService['_selected'] = `${ID}`;
    handlerService.isNew = creatingNew;

    const queryService = TestBed.inject(MysqlQueryService);
    const querySpy = spyOn(queryService, 'query').and.returnValue(of([]));
    spyOn(queryService, 'queryValue').and.returnValue(of());

    spyOn(queryService, 'selectAll').and.returnValue(of(creatingNew ? [] : [originalRow0, originalRow1, originalRow2]));
    // by default the other editor services should not be initialised, because the selectAll would return the wrong types for them
    // const initializeServicesSpy = spyOn(TestBed.inject(QuestPreviewService), 'initializeServices');
    // if (creatingNew) {
    //   // when creatingNew, the selectAll will return an empty array, so it's fine
    //   initializeServicesSpy.and.callThrough();
    // }

    const fixture = TestBed.createComponent(ForgeTalentComponent);
    const component = fixture.componentInstance;
    const page = new ForgeTalentPage(fixture);
    fixture.autoDetectChanges(true);
    fixture.detectChanges();

    return { handlerService, queryService, querySpy, fixture, component, page };
  }

  describe('Creating new', () => {
    it('should correctly initialise', () => {
      const { page } = setup(true);
      page.expectDiffQueryToBeEmpty();
      page.expectFullQueryToBeEmpty();
      expect(page.formError.hidden).toBe(true);
      expect(page.addNewRowBtn.disabled).toBe(false);
      expect(page.deleteSelectedRowBtn.disabled).toBe(true);
      expect(page.getInputById('spellid').disabled).toBe(true);
      expect(page.getInputById('talentTabId').disabled).toBe(true);
      expect(page.getInputById('columnIndex').disabled).toBe(true);
      expect(page.getInputById('rowIndex').disabled).toBe(true);
      expect(page.getInputById('rankCost').disabled).toBe(true);
      expect(page.getInputById('minLevel').disabled).toBe(true);
      expect(page.getInputById('talentType').disabled).toBe(true);
      expect(page.getInputById('numberRanks').disabled).toBe(true);
      expect(page.getInputById('preReqType').disabled).toBe(true);
      expect(page.getInputById('tabPointReq').disabled).toBe(true);
      expect(page.getEditorTableRowsCount()).toBe(0);
      page.removeElement();
    });

    it('should correctly update the unsaved status', () => {
      const { page, handlerService } = setup(true);
      expect(handlerService.isForgeUnsaved).toBe(false);
      page.addNewRow();
      expect(handlerService.isForgeUnsaved).toBe(true);
      page.deleteRow();
      expect(handlerService.isForgeUnsaved).toBe(false);
      page.removeElement();
    });

    it('adding new rows and executing the query should correctly work', () => {
      const { page, querySpy } = setup(true);
      const expectedQuery =
        'DELETE FROM `forge_talents` WHERE (`spellId` = 1234);\n' +
        'INSERT INTO `quest_poi` (`QuestID`, `ID`, `ObjectiveIndex`, `MapID`, `WorldMapAreaId`, `Floor`, `Priority`, `Flags`) VALUES\n' +
        '(1234, 0, 0, 0, 0, 0, 0, 0),\n' +
        '(1234, 1, 0, 0, 0, 0, 0, 0),\n' +
        '(1234, 2, 0, 0, 0, 0, 0, 0);\n';
      querySpy.calls.reset();

      page.addNewRow();
      expect(page.getEditorTableRowsCount()).toBe(1);
      page.addNewRow();
      expect(page.getEditorTableRowsCount()).toBe(2);
      page.addNewRow();
      expect(page.getEditorTableRowsCount()).toBe(3);
      page.expectDiffQueryToContain(expectedQuery);

      page.clickExecuteQuery();
      expect(querySpy).toHaveBeenCalledTimes(1);
      expect(querySpy.calls.mostRecent().args[0]).toContain(expectedQuery);
      page.removeElement();
    });

    it('adding a row and changing its values should correctly update the queries', () => {
      const { page } = setup(true);
      page.addNewRow();
      page.expectDiffQueryToContain(
        'DELETE FROM `quest_poi` WHERE (`QuestID` = 1234) AND (`ID` IN (0));\n' +
          'INSERT INTO `quest_poi` (`QuestID`, `ID`, `ObjectiveIndex`, `MapID`, `WorldMapAreaId`, `Floor`, `Priority`, `Flags`) VALUES\n' +
          '(1234, 0, 0, 0, 0, 0, 0, 0);',
      );
      page.expectFullQueryToContain(
        'DELETE FROM `quest_poi` WHERE (`QuestID` = 1234);\n' +
          'INSERT INTO `quest_poi` (`QuestID`, `ID`, `ObjectiveIndex`, `MapID`, `WorldMapAreaId`, `Floor`, `Priority`, `Flags`) VALUES\n' +
          '(1234, 0, 0, 0, 0, 0, 0, 0);',
      );

      page.setInputValueById('ObjectiveIndex', '1');
      page.expectDiffQueryToContain(
        'DELETE FROM `quest_poi` WHERE (`QuestID` = 1234) AND (`ID` IN (0));\n' +
          'INSERT INTO `quest_poi` (`QuestID`, `ID`, `ObjectiveIndex`, `MapID`, `WorldMapAreaId`, `Floor`, `Priority`, `Flags`) VALUES\n' +
          '(1234, 0, 1, 0, 0, 0, 0, 0);\n',
      );
      page.expectFullQueryToContain(
        'DELETE FROM `quest_poi` WHERE (`QuestID` = 1234);\n' +
          'INSERT INTO `quest_poi` (`QuestID`, `ID`, `ObjectiveIndex`, `MapID`, `WorldMapAreaId`, `Floor`, `Priority`, `Flags`) VALUES\n' +
          '(1234, 0, 1, 0, 0, 0, 0, 0);',
      );
      page.removeElement();
    });
  });

  describe('Editing existing', () => {
    it('should correctly initialise', () => {
      const { page } = setup(false);
      expect(page.formError.hidden).toBe(true);
      page.expectDiffQueryToBeShown();
      page.expectDiffQueryToBeEmpty();
      page.expectFullQueryToContain(
        'DELETE FROM `quest_poi` WHERE (`QuestID` = 1234);\n' +
          'INSERT INTO `quest_poi` (`QuestID`, `ID`, `ObjectiveIndex`, `MapID`, `WorldMapAreaId`, `Floor`, `Priority`, `Flags`) VALUES\n' +
          '(1234, 0, 0, 0, 0, 0, 0, 0),\n' +
          '(1234, 1, 0, 0, 0, 0, 0, 0),\n' +
          '(1234, 2, 0, 0, 0, 0, 0, 0);\n',
      );
      expect(page.getEditorTableRowsCount()).toBe(3);
      page.removeElement();
    });

    it('deleting rows should correctly work', () => {
      const { page } = setup(false);
      page.deleteRow(1);
      expect(page.getEditorTableRowsCount()).toBe(2);
      page.expectDiffQueryToContain('DELETE FROM `quest_poi` WHERE (`QuestID` = 1234) AND (`ID` IN (1));');
      page.expectFullQueryToContain(
        'DELETE FROM `quest_poi` WHERE (`QuestID` = 1234);\n' +
          'INSERT INTO `quest_poi` (`QuestID`, `ID`, `ObjectiveIndex`, `MapID`, `WorldMapAreaId`, `Floor`, `Priority`, `Flags`) VALUES\n' +
          '(1234, 0, 0, 0, 0, 0, 0, 0),\n' +
          '(1234, 2, 0, 0, 0, 0, 0, 0);',
      );

      page.deleteRow(1);
      expect(page.getEditorTableRowsCount()).toBe(1);
      page.expectDiffQueryToContain('DELETE FROM `quest_poi` WHERE (`QuestID` = 1234) AND (`ID` IN (1, 2));');
      page.expectFullQueryToContain(
        'DELETE FROM `quest_poi` WHERE (`QuestID` = 1234);\n' +
          'INSERT INTO `quest_poi` (`QuestID`, `ID`, `ObjectiveIndex`, `MapID`, `WorldMapAreaId`, `Floor`, `Priority`, `Flags`) VALUES\n' +
          '(1234, 0, 0, 0, 0, 0, 0, 0);',
      );

      page.deleteRow(0);
      expect(page.getEditorTableRowsCount()).toBe(0);
      page.expectDiffQueryToContain('DELETE FROM `quest_poi` WHERE `QuestID` = 1234;');
      page.expectFullQueryToBeEmpty();
      page.removeElement();
    });

    it('editing existing rows should correctly work', () => {
      const { page } = setup(false);
      page.clickRowOfDatatable(1);
      page.setInputValueById('ObjectiveIndex', 111);

      page.expectDiffQueryToContain(
        'DELETE FROM `quest_poi_points` WHERE (`QuestID` = 1234) AND (`ID` IN (1, 111));\n' +
          'INSERT INTO `quest_poi_points` (`QuestID`, `ID`, `ObjectiveIndex`, `MapID`, `WorldMapAreaId`, `Floor`, `Priority`, `Flags`) VALUES\n' +
          '(1234, 0, 111, 0, 0, 0, 0, 0);\n',
      );
      page.expectFullQueryToContain(
        'DELETE FROM `quest_poi` WHERE (`QuestID` = 1234);\n' +
          'INSERT INTO `quest_poi` (`QuestID`, `ID`, `ObjectiveIndex`, `MapID`, `WorldMapAreaId`, `Floor`, `Priority`, `Flags`) VALUES\n' +
          '(1234, 0, 0, 0, 0, 0, 0, 0),\n' +
          '(1234, 0, 111, 0, 0, 0, 0, 0),\n' +
          '(1234, 0, 2, 0, 0, 0, 0, 0);\n',
      );
      page.removeElement();
    });

    it('combining add, edit and delete should correctly work', () => {
      const { page } = setup(false);
      page.addNewRow();
      expect(page.getEditorTableRowsCount()).toBe(4);

      page.clickRowOfDatatable(1);
      page.setInputValueById('ID', 10);
      expect(page.getEditorTableRowsCount()).toBe(4);

      page.deleteRow(2);
      expect(page.getEditorTableRowsCount()).toBe(3);

      page.expectDiffQueryToContain(
        'DELETE FROM `quest_poi` WHERE (`QuestID` = 1234) AND (`ID` IN (1, 2, 10, 3));\n' +
          'INSERT INTO `quest_poi` (`QuestID`, `ID`, `ObjectiveIndex`, `MapID`, `WorldMapAreaId`, `Floor`, `Priority`, `Flags`) VALUES\n' +
          '(1234, 10, 0, 0, 0, 0, 0, 0),\n' +
          '(1234, 3, 0, 0, 0, 0, 0, 0);\n',
      );
      page.expectFullQueryToContain(
        'DELETE FROM `quest_poi` WHERE (`QuestID` = 1234);\n' +
          'INSERT INTO `quest_poi` (`QuestID`, `ID`, `ObjectiveIndex`, `MapID`, `WorldMapAreaId`, `Floor`, `Priority`, `Flags`) VALUES\n' +
          '(1234, 0, 0, 0, 0, 0, 0, 0),\n' +
          '(1234, 10, 0, 0, 0, 0, 0, 0),\n' +
          '(1234, 3, 0, 0, 0, 0, 0, 0);\n',
      );
      page.removeElement();
    });

    it('using the same row Id for multiple rows should correctly show an error', () => {
      const { page } = setup(false);
      page.clickRowOfDatatable(2);
      page.setInputValueById('ID', 0);

      page.expectUniqueError();
      page.removeElement();
    });
  });
});
