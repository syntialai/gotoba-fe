<template>
  <div class="payment-guide bg-white">
    <NavigationBack title="Tranfer Bank Payment" />

    <div class="article-content p-3">
      <h5>How to Pay with Bank Transfer</h5>
      <div class="font-size-14">
        Berikut panduan melakukan pembayaran dengan Transfer Bank:
        <b-list-group>
          <b-list-group-item class="d-flex align-items-start">
            <b-badge class="bg-color-primary mr-3" pill>1</b-badge>
            Setelah Anda selesai memilih produk dan melanjutkan ke halaman
            Keranjang Belanja.
          </b-list-group-item>
          <b-list-group-item class="d-flex align-items-start">
            <b-badge class="bg-color-primary mr-3" pill>2</b-badge>
            <div>
              Pada halaman Checkout, pilih durasi pengiriman dan pilih metode
              pembayaran Transfer Bank. <br>
              <b>
                <img alt="User-added image"
                  src="https://ecs7.tokopedia.net/img/helpcenter/2020/04/3-1-e1586248238715.png"
                >
              </b>
            </div>
          </b-list-group-item>
          <b-list-group-item class="d-flex align-items-start">
            <b-badge class="bg-color-primary mr-3" pill>3</b-badge>
            <div>
              Pada halaman selanjutnya, pilih bank yang digunakan, lalu isi
              nomor serta nama pemilik rekening. Klik <b>Bayar</b>.<br>
              <b>
                <img alt="User-added image"
                  src="https://ecs7.tokopedia.net/img/helpcenter/2020/04/1-3-e1586248261482.png"
                >
              </b>
            </div>
          </b-list-group-item>
          <b-list-group-item class="d-flex align-items-start">
            <b-badge class="bg-color-primary mr-3" pill>4</b-badge>
            Lakukan pembayaran sesuai jumlah tagihan beserta kode unik (3
            angka terakhir dari nominal yang harus dibayarkan) dan tunggu
            hingga pembayaranmu diverifikasi oleh Tokopedia.
          </b-list-group-item>
          <b-list-group-item class="d-flex align-items-start">
            <b-badge class="bg-color-primary mr-3" pill>5</b-badge>
            <div>
              Untuk waktu verifikasi tetap sama, yakni <b>1x24 jam</b>.
            </div>
          </b-list-group-item>
          <b-list-group-item class="d-flex align-items-start">
            <b-badge class="bg-color-primary mr-3" pill>6</b-badge>
            <div>
              Pastikan pembayaran kamu sudah berhasil dan <b>unggah bukti</b>
              untuk mempercepat proses verifikasi. Untuk mengetahui cara unggah
              bukti silakan klik
              <a
                href="https://www.tokopedia.com/help/article/cara-upload-bukti-pembayaran-pada-metode-pembayaran-transfer-bank"
                target="_blank"
              >
                di sini
              </a>.
            </div>
          </b-list-group-item>
          <b-list-group-item class="d-flex align-items-start">
            <b-badge class="bg-color-primary mr-3" pill>7</b-badge>
            <div>
              Apabila ada data pembayaran yang salah (nomor atau nama pemilik
              rekening), kamu bisa mengubahnya di halaman
              <b>
                <a href="https://www.tokopedia.com/payment-list" target="_blank">
                  Status Pembayaran
                </a>
              </b>.
            </div>
          </b-list-group-item>
        </b-list-group>

        <div class="article-content__note p-3 border-square-10 mt-4">
          <p class="m-0">
            <b>Catatan:</b>
            Mohon untuk tidak memberikan bukti pembayaran dan data pembayaran
            kepada pihak manapun kecuali
            <span class="font-color-blue-secondary">gotoba</span>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBack from '@/components/NavigationBack.vue';

export default {
  name: 'PaymentGuide',
  components: {
    NavigationBack,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index';

.badge-pill {
  border-radius: 100%!important;
  padding: 6px 8px;
}

.list-group-item {
  border: none;
  padding: .75rem 0;
}

.article-content__note {
  background-color: rgba($accent-orange, 0.2);
}
</style>
