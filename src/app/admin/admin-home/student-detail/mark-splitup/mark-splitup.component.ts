import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-mark-splitup',
  templateUrl: './mark-splitup.component.html',
  styleUrls: ['./mark-splitup.component.scss'],
})
export class MarkSplitupComponent implements OnInit {
  userMarks = [];
  id: string;
  name: string;
  constructor(
    private location: Location,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
        this.adminService.getMarkById(this.id).subscribe((res) => {
          this.name = res.mark[0].username;
          Object.keys(res.mark[0]).forEach((key) => {
            if (
              key == '_id' ||
              key == 'creator' ||
              key == '__v' ||
              key == 'username' ||
              key == 'rollno'
            ) {
            } else {
              this.userMarks.push({
                event: key,
                mark: res.mark[0][key],
              });
            }
          });
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.userMarks);
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
    FileSaver.saveAs(data, fileName + '_' + this.name + EXCEL_EXTENSION);
  }
}
