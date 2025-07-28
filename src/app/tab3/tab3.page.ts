import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  riwayat: any[] = [];

  constructor(private http: HttpClient) {}

  ionViewWillEnter() {
    this.loadRiwayat();
  }

  loadRiwayat() {
    // ✅ Ganti URL ke domain hosting kamu
    const url = 'https://ranijuniarsi.ti-zone.io/get.php';
    this.http.get<any[]>(url).subscribe(
      data => {
        this.riwayat = data;
      },
      error => {
        console.error('Gagal ambil data perjalanan', error);
      }
    );
  }
}
