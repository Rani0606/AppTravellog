import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  riwayat: any[] = [];
  jenisFavorit: string = '';

  constructor(
    private navCtrl: NavController,
    private http: HttpClient
  ) {}

  ionViewWillEnter() {
    this.loadRiwayat();
  }

  loadRiwayat() {
    // ✅ Ganti dengan URL hosting
    this.http.get<any[]>('https://ranijuniarsi.ti-zone.io/get.php').subscribe({
      next: (data) => {
        this.riwayat = data;
        this.hitungJenisFavorit();
      },
      error: (err) => {
        console.error('Gagal ambil riwayat', err);
        this.riwayat = [];
        this.jenisFavorit = '';
      }
    });
  }

  hitungJenisFavorit() {
    const count: { [key: string]: number } = {};

    this.riwayat.forEach(item => {
      if (item.jenis_perjalanan) {
        const jenis = item.jenis_perjalanan.trim();
        count[jenis] = (count[jenis] || 0) + 1;
      }
    });

    const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
    this.jenisFavorit = sorted.length > 0 ? sorted[0][0] : '';
  }

  goToInput(item?: any) {
    this.navCtrl.navigateRoot('/tabs/tab2');
  }
}
