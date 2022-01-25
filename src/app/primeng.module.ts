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
  ],
})
export class PrimengModule {}
