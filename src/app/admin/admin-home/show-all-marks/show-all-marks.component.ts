import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-show-all-marks',
  templateUrl: './show-all-marks.component.html',
  styleUrls: ['./show-all-marks.component.scss'],
})
export class ShowAllMarksComponent implements OnInit {
  marks = [];
  constructor(private adminService: AdminService, private location: Location) {}

  ngOnInit(): void {
    this.adminService.getAllMarks().subscribe((res) => {
      this.marks = res.marks;
      console.log(res);
    });
  }

  goBack() {
    this.location.back();
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.marks);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'detail');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string) {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + '_' + 'eie' + EXCEL_EXTENSION);
  }
}
