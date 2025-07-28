import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  form: any = {
    tanggal: '',
    lokasi: '',
    jenis_perjalanan: '',
    teman_perjalanan: '',
    aktivitas: '',
    cuaca: '',
    catatan: ''
  };

  constructor(private http: HttpClient, private toastCtrl: ToastController) {}

  async submitForm() {
    const url = 'https://ranijuniarsi.ti-zone.io/insert.php'; // ✅ sudah diganti ke hosting

    this.http.post(url, this.form).subscribe(
      async (res: any) => {
        if (res.success) {
          this.form = {}; // reset form
          this.showToast('Perjalanan berhasil dicatat!');
        } else {
          this.showToast('Gagal menyimpan data!');
        }
      },
      (error) => {
        console.error(error);
        this.showToast('Terjadi kesalahan koneksi!');
      }
    );
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
