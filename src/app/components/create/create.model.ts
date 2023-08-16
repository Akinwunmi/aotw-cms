import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface CreateForm {
  [CreateFormStep.GeneralInfo]: FormGroup<GeneralInfoForm>;
  [CreateFormStep.Layout]: FormGroup<LayoutForm>;
}

export interface GeneralInfoForm {
  [CreateFormControls.Name]: FormControl<string>;
  [CreateFormControls.MainCategory]: FormControl<string>;
  [CreateFormControls.MainTopics]: FormArray<FormControl<string>>;
}

export interface LayoutForm {
  [CreateFormControls.Layout]: FormControl<ArchiveLayout[]>;
}

export enum CreateFormStep {
  GeneralInfo = 'GENERAL_INFO',
  Layout = 'LAYOUT'
}

export enum CreateFormControls {
  Name = 'NAME',
  MainCategory = 'MAIN_CATEGORY',
  MainTopics = 'MAIN_TOPICS',
  Layout = 'LAYOUT'
}

export enum ArchiveLayout {
  Main = 'MAIN',
  MainWithoutImages = 'MAIN_WITHOUT_IMAGES'
}
