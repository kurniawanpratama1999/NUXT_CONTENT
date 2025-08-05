<!-- <script setup>
const line = `

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis posuere ipsum, in eleifend dui varius accumsan. Ut a est maximus, ultricies erat ut, molestie ligula. Vivamus mollis commodo vestibulum. Sed eget porta metus, nec imperdiet mi. Mauris in lacus at nulla tempor ullamcorper sit amet nec orci. Donec vel fermentum ex. Quisque non ornare orci, non vestibulum nisi.
Integer eu lectus quis velit rhoncus gravida in vel massa. Proin aliquet, orci non maximus molestie, justo velit viverra metus, nec facilisis nisi nulla id tellus. Vestibulum euismod mollis vehicula. Vestibulum dignissim, purus aliquam egestas vulputate, lorem dolor sagittis ipsum, in dictum ligula ante eu metus. Nullam non imperdiet neque, id sollicitudin nisl. Nunc lorem nisl, bibendum non tellus id, hendrerit consequat nisl. Donec a tincidunt lorem. Nam porttitor, magna nec lobortis rhoncus, ante odio fringilla massa, eu feugiat mauris enim in est. Phasellus nec tincidunt ante.
Mauris imperdiet malesuada egestas. Proin a facilisis tortor, sit amet lobortis eros. Aenean faucibus ullamcorper mauris, eget congue justo sodales id. Vestibulum vitae condimentum ipsum, vitae porta ipsum. In eget sapien sed orci consequat mollis. Suspendisse in venenatis nulla, vel elementum nulla. Morbi gravida, arcu quis commodo tincidunt, magna leo venenatis diam, sed interdum nulla tortor vestibulum augue. Phasellus vestibulum metus non eleifend cursus. Phasellus vitae scelerisque ligula. Fusce non velit suscipit, laoreet ipsum id, condimentum turpis. Sed non nisl lectus.
Aenean mollis tellus sed dolor posuere auctor. Sed tristique nibh mauris, eget porta tortor convallis et. Donec lacinia nisi et massa euismod ultrices. Aliquam gravida nunc ac sem interdum tempor. In aliquet arcu eget erat tempor varius. Praesent ex lorem, ornare eget leo in, euismod vehicula nisl. Praesent eget enim erat. Nunc porta bibendum ligula sed fermentum. Proin malesuada turpis ac velit malesuada, sed tristique dolor ornare. Morbi sit amet libero ut metus congue euismod nec tempor tortor. Mauris laoreet sapien eget mauris venenatis luctus. Nunc massa dui, condimentum nec augue vestibulum, efficitur viverra augue. Integer consequat lacinia lorem, non ornare risus luctus ac.
Nam in leo sed velit iaculis viverra vitae et libero. Praesent placerat, risus et auctor maximus, eros diam mattis turpis, at varius felis felis at justo. Nam eget mollis elit, nec euismod quam. Proin faucibus massa vel placerat aliquet. Sed suscipit massa eget arcu eleifend, eu ultricies nulla facilisis. Proin posuere justo sed felis lacinia molestie ac at lacus. Cras in eros non ligula viverra sollicitudin. Nam aliquam, lorem at maximus placerat, magna ex iaculis erat, ut lobortis purus dui in erat. Curabitur in massa nec metus pellentesque laoreet quis in lorem. Donec eu aliquet enim. Sed et consectetur sapien, in lobortis erat. Suspendisse posuere nunc quis enim sollicitudin, in pharetra mauris consectetur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras elementum malesuada orci, ut auctor sapien fermentum non. In euismod mi at ultricies hendrerit.
Fusce quis lorem in massa gravida venenatis. Donec egestas est id aliquet hendrerit. Proin pretium, nisl a ultrices convallis, lectus arcu porta tellus, eu faucibus lorem quam in ex. Vestibulum viverra ipsum accumsan dui tristique fermentum. Aenean iaculis scelerisque lobortis. Curabitur varius pretium bibendum. Suspendisse pharetra nibh sit amet magna bibendum porta. Mauris scelerisque orci eget massa tempor faucibus. Nulla vel est tellus.
Curabitur nec massa at nisi convallis elementum id eu ligula. Nam sapien leo, facilisis quis velit vestibulum, mollis mattis augue. Vestibulum bibendum purus sed nisi suscipit venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla tincidunt, ligula vitae malesuada tristique, diam orci commodo tortor, ut mattis mauris nibh at lacus. Aliquam a odio vel diam egestas consequat. Aenean mollis eget turpis eu mollis. Sed orci dolor, vulputate vitae purus nec, tincidunt interdum dolor.
Sed finibus id enim a malesuada. Nullam rhoncus est sit amet nibh fermentum aliquet. Proin luctus vehicula eros eu interdum. Duis sodales dignissim orci nec ultricies. Sed tempus lacus vel eros cursus, vitae pulvinar magna auctor. Integer condimentum ornare dui, quis condimentum tortor sodales non. Fusce hendrerit vulputate lectus convallis mattis. Nam et est vitae ex tempor condimentum a eget enim. Nunc faucibus erat mauris, quis sagittis nibh mattis ac.
Vestibulum volutpat risus finibus arcu iaculis, quis pharetra purus accumsan. Nam a ornare quam. Nulla quis imperdiet turpis. Nullam rhoncus lectus sit amet vehicula ultricies. Curabitur magna orci, elementum at venenatis sit amet, elementum id lacus. Donec ornare feugiat magna, sit amet euismod dolor mattis in. Donec vel congue magna. Nulla commodo rhoncus rhoncus. Duis enim sem, suscipit vitae vulputate eu, feugiat non lectus. Ut molestie ultricies metus, ac gravida est vehicula et. Aliquam eget purus laoreet, aliquet erat gravida, suscipit quam. Morbi eget ullamcorper tortor. Integer sed mi in urna blandit molestie non in tortor. Aenean ac mollis quam.
Fusce suscipit, ipsum eu gravida tempus, leo urna dictum nunc, vitae placerat velit nulla et orci. Morbi dapibus arcu sit amet velit scelerisque aliquam. Aliquam a vehicula dui. Fusce cursus pharetra eleifend. Duis id lectus risus. Quisque quis massa vulputate neque aliquet commodo at non ipsum. Suspendisse potenti. Nam eget dignissim arcu. Duis at massa nec urna consectetur lacinia ut vel ex. Proin non molestie nisl. In non dui eget felis porttitor venenatis a ac nunc. `;

async function readPDF() {
  const res = await fetch("/api/pdfkit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Laporan Harian",
      content: line,
    }),
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  // Preview
  window.open(url, "_blank");
}
</script> -->
<script setup>
const kotaDanTanggalSurat = reactive({
  text: "Jakarta, 20 Agustus 2025",
  align: "right",
});

const namaPenerima = reactive({
  text: "Rizky Wijaya",
  align: "left",
});

const namaPerusahaan = reactive({
  text: "PT Maju Mundur Kena",
  align: "left",
});

const alamatPerusahaan = reactive({
  text: "Jalan Dukuh Raya, Kebayoran Lama, Kebayoran Lama Utara, Jakarta Selatan",
  align: "left",
});

const salamPembuka = reactive({
  text: "Berdasarkan informasi yang saya peroleh dari King Usop, bahwasannya Kapal Bajak Laut Mugiwara sedang membutuhkan Wakil Kapten yang ahli dalam berpedang, berikut adalah data diri saya:",
  align: "justify",
});

const biodata = reactive({
  text: "Nama:Saya\nTanggal Lahir:Kota, dd-mm-yyyy atau dd mmmm yyyy\nLulusan:SMKN 59 Jakarta\nJurusan:Nama Jurusan",
  align: "justify",
});

const isiSurat = reactive({
  text: "Dengan berbekal keahlian menggunakan 3 pedang sekaligus, saya memiliki jurus ampuh yang setara dengan jabatan kapten, selain itu pengalaman saya di dojo dan latihan fisik yang rutin membuat saya tidak perlu lagi memakan devil fruit, sehingga saya mampu berenang di laut dengan mudah",
  align: "justify",
});

const berkasLampiran = reactive({
  text: "CV\nSurat Lamaran\nFC KTP\nFC KK\nFC SKCK\nFC Transkip Nilai\nFC Ijazah Terakhir\nPas Foto 4x6 Background Merah @ 2 Lembar",
  align: "justify",
});

const salamPenutup = reactive({
  text: "Demikian surat lamaran ini saya buat dengan sebenar-benarnya. Besar harapan saya agar bisa diberikan kesempatan untuk bekerja di perusahaan yang Bapak/Ibu pimpin. Atas perhatiannya dan kerjasamanya saya ucapkan terima kasih.",
  align: "justify",
});

const namaPengirim = reactive({
  text: "Kurniawan Pratama",
  align: "right",
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

const pdfUrl = ref("");

async function handlePreview() {
  const fetching = await fetch("/api/pdfkit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ send: send.value }),
  });

  const blob = await fetching.blob();
  const url = URL.createObjectURL(blob);
  pdfUrl.value = url;
}
function handleDownload() {}

function handleBack() {
  pdfUrl.value = "";
}
</script>
<template lang="html">
  <div
    v-if="pdfUrl"
    class="overflow-x-auto max-w-[700px] mx-auto p-2 bg-[rgba(255,255,255,.3)] rounded"
  >
    <div class="flex justify-between py-3 px-2">
      <button
        @click="handleBack"
        class="py-2 border rounded basis-[100px] bg-blue-300"
      >
        Back
      </button>
      <h4>PREVIEW PDF</h4>
      <button class="py-2 border rounded basis-[100px] bg-red-300">
        Download
      </button>
    </div>
    <iframe
      :src="pdfUrl"
      frameborder="10"
      width="673"
      height="950"
      class="mx-auto rounded"
    />
  </div>
  <form
    v-if="!pdfUrl"
    class="space-y-5 max-w-[580px] mx-auto p-2 bg-[rgba(255,255,255,.3)] rounded"
  >
    <h4 class="text-center">Form Surat Lamaran Kerja</h4>
    <InputText
      id-name="kota-dan-tanggal-surat"
      :holder="`East Blue, ${new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(Date.now())}`"
    />
    <InputText id-name="nama-penerima" holder="Bapak Kapten Monkey D. Lufy" />
    <InputText id-name="nama-perusahaan" holder="Kapal Bajak Laut Mugiwara" />
    <InputText id-name="alamat-perusahaan" holder="Jalan Anime One Piece" />
    <InputTextarea
      id-name="salam-pembuka"
      c-input="min-h-30"
      holder="Berdasarkan informasi yang saya peroleh dari King Usop, bahwasannya Kapal Bajak Laut Mugiwara sedang membutuhkan Wakil Kapten yang ahli dalam berpedang, berikut adalah data diri saya:"
    />
    <InputTextarea
      id-name="biodata"
      c-input="min-h-40"
      :holder="`Nama:Saya\nTanggal Lahir:Kota, dd-mm-yyyy atau dd mmmm yyyy\nLulusan:SMKN 59 Jakarta\nJurusan:Nama Jurusan\ndan lain-lain ...`"
    />
    <InputTextarea
      id-name="isi-surat"
      c-input="min-h-40"
      holder="Dengan berbekal keahlian menggunakan 3 pedang sekaligus, saya memiliki jurus ampuh yang setara dengan jabatan kapten, selain itu pengalaman saya di dojo dan latihan fisik yang rutin membuat saya tidak perlu lagi memakan devil fruit, sehingga saya mampu berenang di laut dengan mudah"
    />
    <InputTextarea
      id-name="berkas-lampiran"
      c-input="min-h-50"
      :holder="`CV\nSurat Lamaran\nFC KTP\nFC KK\nFC SKCK\nFC Transkip Nilai\nFC Ijazah Terakhir\nPas Foto 4x6 Background Merah @ 2 Lembar\ndan lain-lain ...`"
    />
    <InputTextarea
      id-name="salam penutup"
      c-input="min-h-40"
      holder="Demikian surat lamaran ini saya buat dengan sebenar-benarnya. Besar harapan saya agar bisa diberikan kesempatan untuk bekerja di Kapal Bajak Laut Mugiwara Kapten Luffy pimpin. Atas perhatiannya dan kerjasamanya saya ucapkan terima kasih."
    />
    <InputText id-name="nama-pengirim" />
    <div class="flex justify-center gap-3">
      <button
        @click="handlePreview"
        type="button"
        class="bg-emerald-400 text-emerald-100 py-2 px-5 rounded font-bold basis-full"
      >
        Preview PDF
      </button>
      <button
        @click="handleDownload"
        type="button"
        class="bg-red-400 text-red-100 py-2 px-5 rounded font-bold basis-full"
      >
        Download PDF
      </button>
    </div>
  </form>
</template>
