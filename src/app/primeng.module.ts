import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TagModule } from 'primeng/tag';
import {MegaMenuModule} from 'primeng/megamenu';

@NgModule({
  imports: [
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    FileUploadModule,
    ToastModule,
    ProgressSpinnerModule,
    TableModule,
    TooltipModule,
    InputSwitchModule,
    TagModule,
    MegaMenuModule,
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    FileUploadModule,
    ToastModule,
    ProgressSpinnerModule,
    TableModule,
    TooltipModule,
    InputSwitchModule,
    TagModule,
    MegaMenuModule,
  ],
})
export class PrimengModule {}
