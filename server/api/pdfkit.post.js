import PDFDocument from "pdfkit";

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Ambil data dari client
  const {
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

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 50, bottom: 30, left: 30, right: 30 },
    layout: "portrait",
  });
  const chunks = [];

  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => {});

  doc.fontSize(14);

  doc.lineGap(5);
  doc.text(line1.text, { align: line1.align });
  doc.moveDown(0.5);

  doc.text("Perihal: Lamaran Kerja", { align: "left" });
  doc.text("Lampiran: 7 (tujuh)", { align: "left" });
  doc.moveDown(0.2);

  doc.text("Yth. " + line2.text, { align: "left" });
  doc.text(line3.text, { align: line3.align });
  doc.text(line4.text, { align: line4.align, width: 400 });
  doc.moveDown(1);

  doc.text("Dengan Hormat,", { align: "left", indent: 40 });
  doc.moveDown(0.2);

  doc.text(line5.text, { align: line5.align, indent: 40 });
  doc.moveDown(0.2);

  const splitBiodata = line6.text.split(/[\n;]/).map((l) => {
    const splitAgain = l.split(/[:=]/);

    return [splitAgain[0], ":", splitAgain[1]];
  });

  const maxLengthOfBiodata = Math.max(
    ...splitBiodata.map((i) => i[0].length + 12 + 70)
  );

  doc.table({
    columnStyles: [maxLengthOfBiodata, "12", "*"],
    rowStyles: { border: false, padding: 0 },
    position: { x: 60 },
    data: splitBiodata,
  });
  doc.moveDown(0.2);

  doc.text(line7.text, 30, doc.y, { align: line7.align, indent: 40 });
  doc.moveDown(0.2);

  const modifyBerkasLampiran = line8.text
    .split(/[\n;]/)
    .map((v, i) => `- ${v}`);

  let countLampiran = modifyBerkasLampiran.length;
  const isGenap = countLampiran % 2 == 0;

  if (isGenap) {
    countLampiran /= 2;
  } else {
    countLampiran = (countLampiran + 1) / 2;
  }

  doc.text(modifyBerkasLampiran.join("\n"), 60, doc.y, {
    columns: 2,
    columnGap: 20,
    height: 30 * countLampiran,
  });
  doc.moveDown(0.2);

  doc.text(line9.text, 30, doc.y + 20, { align: line9.align, indent: 40 });
  doc.moveDown(2);

  doc.text(`Hormat saya,\n${line10.text}`, 30, doc.y, { align: line10.align });

  doc.end();

  await new Promise((resolve) => doc.on("end", resolve));
  const buffer = Buffer.concat(chunks);

  setHeader(event, "Content-Type", "application/pdf");

  return buffer;
});
