import PDFDocument from 'pdfkit';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let {
    kotaDanTanggalSurat: line1,
    namaPenerima: line2,
    namaPerusahaan: line3,
    alamatPerusahaan: line4,
    salamPembuka: line5,
    biodata: line6,
    isiSurat: line7,
    berkasLampiran: line8,
    salamPenutup: line9,
    namaPengirim: line10,
  } = body.send;

  if (!line1.text.trim()) {
    line1.text = 'Kota, Tanggal';
  }

  if (!line2.text.trim()) {
    line2.text = 'Nama Penerima';
  }

  if (!line3.text.trim()) {
    line3.text = 'Nama Perusahaan';
  }

  if (!line4.text.trim()) {
    line4.text = 'Alamat Perusahaan';
  }

  if (!line5.text.trim()) {
    line5.text =
      'Salam Pembuka_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________';
  }

  if (!line6.text.trim()) {
    line6.text = 'Label1:Nilai1;Label2:Nilai2;Label(n):Nilai(n)';
  }

  if (!line7.text.trim()) {
    line7.text =
      'Isi Surat______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________';
  }

  if (!line8.text.trim()) {
    line8.text = 'Lampiran1\nLampiran2\nLampiran3\nLampiran4\nLampiran5\nLampiran6\nLampiran7\nLampiran(n)';
  }

  if (!line9.text.trim()) {
    line9.text =
      'Salam Penutup__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________';
  }

  if (!line10.text.trim()) {
    line10.text = 'Nama Pengirim';
  }

  const modifyBerkasLampiran = line8.text.split(/[\n;]/).map((v, i) => `- ${v}`);

  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 30, left: 30, right: 30 },
    layout: 'portrait',
  });
  const chunks = [];

  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('end', () => {});

  doc.fontSize(14);

  doc.lineGap(5);
  doc.text(line1.text, { align: line1.align });
  doc.moveDown(0.5);

  doc.text('Perihal: Lamaran Kerja', { align: 'left' });
  doc.text(`Lampiran: ${modifyBerkasLampiran.length} Berkas`, {
    align: 'left',
  });
  doc.moveDown(0.2);

  doc.text('Yth. ' + line2.text, { align: 'left' });
  doc.text(line3.text, { align: line3.align });
  doc.text(line4.text, { align: line4.align, width: 400 });
  doc.moveDown(1);

  doc.text('Dengan Hormat,', { align: 'left', indent: 40 });
  doc.moveDown(0.2);

  doc.text(line5.text, { align: line5.align, indent: 40 });
  doc.moveDown(0.2);

  const splitBiodata = line6.text.split(/[\n;]/).map((l) => {
    const splitAgain = l.split(/[:=]/);

    return [splitAgain[0], ':', splitAgain[1]];
  });

  const maxLengthOfBiodata = Math.max(...splitBiodata.map((i) => doc.widthOfString(i[0]) + 7));

  doc.table({
    columnStyles: [maxLengthOfBiodata, '12', '*'],
    rowStyles: { border: false, padding: 0 },
    position: { x: 60 },
    data: splitBiodata,
  });
  doc.moveDown(0.2);

  doc.text(line7.text, 30, doc.y, { align: line7.align, indent: 40 });
  doc.moveDown(0.2);

  let countLampiran = modifyBerkasLampiran.length;
  const isGenap = countLampiran % 2 == 0;

  if (isGenap) {
    countLampiran /= 2;
  } else {
    countLampiran = (countLampiran + 1) / 2;
  }

  doc.text(modifyBerkasLampiran.join('\n'), 60, doc.y, {
    columns: 2,
    columnGap: 20,
    height: 24 * countLampiran,
  });
  doc.moveDown(0.2);

  doc.text(line9.text, 30, isGenap ? doc.y : doc.y + 20, {
    align: line9.align,
    indent: 40,
  });
  doc.moveDown(2);

  doc.text(`Hormat saya,\n${line10.text}`, 30, doc.y, {
    align: line10.align,
  });

  doc.fontSize(8).text(body.currentUrl, 10, 10);

  doc.end();

  await new Promise((resolve) => doc.on('end', resolve));
  const buffer = Buffer.concat(chunks);

  setHeader(event, 'Content-Type', 'application/pdf');
  return buffer;
});
