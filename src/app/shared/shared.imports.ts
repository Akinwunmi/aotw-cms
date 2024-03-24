import { CommonModule } from '@angular/common';
import { Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

export const SHARED_IMPORTS: (Type<unknown>)[] = [
  CommonModule,
  ReactiveFormsModule,
  TranslateModule
];
