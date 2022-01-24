import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  imports: [InputTextModule, ButtonModule, InputMaskModule, FileUploadModule],
  exports: [InputTextModule, ButtonModule, InputMaskModule, FileUploadModule],
})
export class PrimengModule {}
