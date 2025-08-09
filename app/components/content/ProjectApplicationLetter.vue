<script setup>
const kotaDanTanggalSurat = reactive({
  text: '',
  align: 'right',
});

const namaPenerima = reactive({
  text: '',
  align: 'left',
});

const namaPerusahaan = reactive({
  text: '',
  align: 'left',
});

const alamatPerusahaan = reactive({
  text: '',
  align: 'left',
});

const salamPembuka = reactive({
  text: '',
  align: 'justify',
});

const biodata = reactive({
  text: '',
  align: 'justify',
});

const isiSurat = reactive({
  text: '',
  align: 'justify',
});

const berkasLampiran = reactive({
  text: '',
  align: 'justify',
});

const salamPenutup = reactive({
  text: '',
  align: 'justify',
});

const namaPengirim = reactive({
  text: '',
  align: 'right',
});

const send = computed(() => {
  return {
    kotaDanTanggalSurat,
    namaPenerima,
    namaPerusahaan,
    alamatPerusahaan,
    salamPembuka,
    biodata,
    isiSurat,
    berkasLampiran,
    salamPenutup,
    namaPengirim,
  };
});

const pdfUrl = ref(null);

const generate = async () => {
  const fetching = await fetch('/api/pdfkit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ send: send.value, currentUrl: window.location.href }),
  });

  const blob = await fetching.blob();
  pdfUrl.value = URL.createObjectURL(blob);
};

async function handlePreview() {
  await generate();
  if (pdfUrl.value) {
    window.open(pdfUrl.value, '_blank');
  }
}

async function handleDownload() {
  if (pdfUrl.value) {
    const link = document.createElement('a');
    link.href = pdfUrl.value;
    link.download = 'Surat_Lamaran_Kerja_' + namaPengirim.text + '.pdf';
    link.click();
  }
}

function handleBack() {
  pdfUrl.value = '';
}
</script>
<template lang="html">
  <div></div>
  <form class="space-y-5 max-w-[580px] mx-auto p-2 bg-[rgba(255,255,255,.3)] rounded">
    <h4 class="text-center">Form Surat Lamaran Kerja</h4>
    <InputText
      v-model="kotaDanTanggalSurat.text"
      id-name="kota-dan-tanggal-surat"
      :holder="`East Blue, ${new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(Date.now())}`" />
    <InputText v-model="namaPenerima.text" id-name="nama-penerima" holder="Bapak Kapten Monkey D. Lufy" />
    <InputText v-model="namaPerusahaan.text" id-name="nama-perusahaan" holder="Kapal Bajak Laut Mugiwara" />
    <InputText v-model="alamatPerusahaan.text" id-name="alamat-perusahaan" holder="Jalan Anime One Piece" />
    <InputTextarea
      v-model="salamPembuka.text"
      id-name="salam-pembuka"
      c-input="min-h-30"
      holder="Berdasarkan informasi yang saya peroleh dari King Usop, bahwasannya Kapal Bajak Laut Mugiwara sedang membutuhkan Wakil Kapten yang ahli dalam berpedang, berikut adalah data diri saya:" />
    <InputTextarea
      v-model="biodata.text"
      id-name="biodata"
      c-input="min-h-40"
      :holder="`Nama:Saya\nTanggal Lahir:Kota, dd-mm-yyyy atau dd mmmm yyyy\nLulusan:SMKN 59 Jakarta\nJurusan:Nama Jurusan\ndan lain-lain ...`" />
    <InputTextarea
      v-model="isiSurat.text"
      id-name="isi-surat"
      c-input="min-h-40"
      holder="Dengan berbekal keahlian menggunakan 3 pedang sekaligus, saya memiliki jurus ampuh yang setara dengan jabatan kapten, selain itu pengalaman saya di dojo dan latihan fisik yang rutin membuat saya tidak perlu lagi memakan devil fruit, sehingga saya mampu berenang di laut dengan mudah" />
    <InputTextarea
      v-model="berkasLampiran.text"
      id-name="berkas-lampiran"
      c-input="min-h-50"
      :holder="`CV\nSurat Lamaran\nFC KTP\nFC KK\nFC SKCK\nFC Transkip Nilai\nFC Ijazah Terakhir\nPas Foto 4x6 Background Merah @ 2 Lembar\ndan lain-lain ...`" />
    <InputTextarea
      v-model="salamPenutup.text"
      id-name="salam penutup"
      c-input="min-h-40"
      holder="Demikian surat lamaran ini saya buat dengan sebenar-benarnya. Besar harapan saya agar bisa diberikan kesempatan untuk bekerja di Kapal Bajak Laut Mugiwara Kapten Luffy pimpin. Atas perhatiannya dan kerjasamanya saya ucapkan terima kasih." />
    <InputText id-name="nama-pengirim" v-model="namaPengirim.text" />
    <div class="flex justify-center gap-3">
      <button
        @click="handlePreview"
        type="button"
        class="bg-emerald-400 text-emerald-100 py-2 px-5 rounded font-bold basis-full">
        Preview PDF
      </button>
      <button
        @click="handleDownload"
        type="button"
        class="bg-red-400 text-emerald-100 py-2 px-5 rounded font-bold basis-full">
        Download PDF
      </button>
    </div>
  </form>
</template>
