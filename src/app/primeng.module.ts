import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    FileUploadModule,
    ToastModule,
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    FileUploadModule,
    ToastModule,
  ],
})
export class PrimengModule {}
