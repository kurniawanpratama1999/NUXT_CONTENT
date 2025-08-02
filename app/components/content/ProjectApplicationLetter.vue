<script setup>
import {jsPDF} from 'jspdf';

    const tanggalSurat = reactive({
        text: "Jakarta, 02 Agustus 2025",
        align: "center",
    })

    const informasiPenerima = reactive({
        text: "yth.\nBapak/Ibu Rekruter\nJalan Jalan\n\ndi tempat",
        align: "left",
    })

    const kalimatPembuka = reactive({
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque sem vel purus efficitur, a aliquet lacus bibendum. Nam eget enim luctus ipsum convallis congue. Vivamus a arcu mauris. Phasellus a mi vel nunc tristique fringilla. Sed nisi felis, ornare a dolor eleifend, commodo finibus ipsum. Quisque tincidunt dui sed metus suscipit ultrices. Ut suscipit condimentum urna sed dignissim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum mi nunc, dapibus a quam a, venenatis ultrices quam.`,
        align: "justify",
    })

    const biodata = reactive({
        text: "Nama Lengkap: Kurniawan\nTempat Tanggal Lahir: Nganjuk, 07 Januari 1999\nDomisili: Jakarta Selatan",
        align: "left",
    })

    const informasiTambahan = reactive({
        text: "Aenean porta facilisis nibh, ut malesuada dolor porttitor et. Aenean ultricies ex purus, eget tincidunt ex suscipit finibus. Praesent ornare a felis venenatis maximus. Integer et sem faucibus, porta nisl vitae, porttitor mi. In rhoncus blandit varius. Nullam purus metus, vulputate vitae facilisis id, cursus a enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque a blandit ante. Donec egestas, erat ut blandit tempus, diam sapien condimentum orci, at tempor ipsum purus nec neque. Nam condimentum a lectus eu maximus. Vestibulum ac ipsum non mauris auctor malesuada. Duis eget justo imperdiet, convallis turpis ac, convallis eros.",
        align: "justify",
    })

    const daftarLampiran = reactive({
        text: "1. CV\n2. KTP\n3. KK",
        align: "left",
    })

    const kalimatPenutup = reactive({
        text: "In suscipit arcu in mi sagittis accumsan. Donec non eleifend tortor. Donec varius nisl ut bibendum aliquam. Donec bibendum risus et ante consectetur volutpat. Quisque ut luctus enim. Pellentesque a justo ac ligula aliquam condimentum. Nam vulputate vulputate nibh, in fermentum odio consectetur sed. In blandit enim quam, quis suscipit enim tincidunt nec. In venenatis orci eget quam ullamcorper malesuada. Sed viverra molestie lorem. Cras quis elit a lacus hendrerit mollis eget at mi. Proin facilisis, purus eu venenatis varius, mi tortor convallis est, nec condimentum libero elit ut metus. Nam efficitur, sapien eget sollicitudin sodales, dolor eros venenatis lacus, et egestas mi nisl et nunc.",
        align: "justify",
    })

    const doc = new jsPDF();

    // Page Size
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    // Margin X Y
    const margin = 10 // it means 10 * 2 for (x) and 10 * 2 for (y)
    const marginX = margin * 2;
    const marginY = margin * 2;

    // define
    const usablePageWidth = pageWidth - marginX;
    const usablePageHeigth = pageHeight - margin

    // The Words    
    // const words = useWords();
    const fontSz = 14;
    const lineSpacing = 1.5;
    const lineHeight = fontSz * lineSpacing - fontSz

    // lineHeight
    let y = margin;
    let page = 1;
        
    const extractForm = () => {
        const words = computed(() => {
            return [tanggalSurat, informasiPenerima, kalimatPembuka, biodata, informasiTambahan, daftarLampiran, kalimatPenutup]
        })
        
        let arr = [] 
        for (let w = 0; w < words.value.length; w++) {        
            const obj = words.value[w];
            const {text, align} = obj;
            
            const lines = doc.splitTextToSize(text, usablePageWidth)
            
            let stack = []
            for (let l = 0; l < lines.length; l++) {
                const line = lines[l];

                if (y > usablePageHeigth) {
                    y = margin
                    page += 1
                    doc.addPage()
                }

                if (align === 'justify') {
                    if (lines.length > 1) {
                        if (l == lines.length - 1) {
                            if (stack.length !== 0) {
                                arr.push({line: stack.map(stck => stck.line).join(' '), align: 'justify', y: stack[0].y, page: stack[0].page})
                                stack = []
                            }
                            y -= lineHeight
                            arr.push({line, align: "left", y, page})
                        } else {
                            stack.push({line, align, y, page})
                        }
                    } else {
                        arr.push({line, align, y, page})
                    }
                } else {
                    arr.push({line, align, y, page})
                }

                y += lineHeight
            }
            
            
            if (stack.length !== 0) {
                arr.push({line: stack.map(stck => stck.line).join(' '), align: 'justify', y: stack[0].y, page: stack[0].page})
            }            
            
            arr.push({line: "", align: 'left', y, page})
            y += lineHeight
        }

        return arr;
    }

    const handleView = () => {
        doc.setFontSize(fontSz)

        const arrText = extractForm()
        console.table(arrText)

        for (let t = 0; t < arrText.length; t++) {
            const arr = arrText[t];
            doc.setPage(arr.page)
            doc.text(arr.line.trim(), margin, arr.y, {align: arr.align, maxWidth: usablePageWidth})
        }

        doc.output("pdfobjectnewwindow", {filename: 'Test.pdf'})
    }
</script>

<template>
    <section id="app-letter" class="w-full border">
        <h3>Application Letter</h3>
        <form class="flex flex-col p-2 space-y-5">
            <InputText v-model="tanggalSurat.text" id-name="tanggal-surat"/>
            <InputTextarea v-model="informasiPenerima.text" id-name="informasi-penerima"/>
            <InputTextarea v-model="kalimatPembuka.text" id-name="kalimat-pembuka"/>
            <InputTextarea v-model="biodata.text" id-name="biodata"/>
            <InputTextarea v-model="informasiTambahan.text" id-name="informasi-tambahan"/>
            <InputTextarea v-model="daftarLampiran.text" id-name="daftar-lampiran"/>
            <InputTextarea v-model="kalimatPenutup.text" id-name="kalimat-penutup"/>

            <div class="grid grid-cols-[1fr_1fr] gap-5">
                <button type="button" class="border px-2 py-3">Save Document</button>
                <button type="button" class="border px-2 py-3" @click="handleView">View Document</button>
            </div>
        </form>
    </section>
</template>