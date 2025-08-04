import { jsPDF } from "jspdf";

export default class {
  #doc = new jsPDF("p", "mm", "a4");
  constructor({ y = 10, options }) {
    this.state = reactive({
      options,
      y,
    });
  }

  read() {
    return this.#textPrint();
  }

  #textPrint() {
    const arr = this.#mergeText();

    for (let a = 0; a < arr.length; a++) {
      const { page, id } = arr[a];

      this.#doc.setPage(page);

      for (let d = 0; d < id.length; d++) {
        const item = id[d];
        this.#doc.setFontSize(item.fontSize);

        if (item.align == "left" || item.align === "justify") {
          this.#doc.text(item.text, item.x, item.y, {
            align: item.align,
            maxWidth: item.width,
            lineHeightFactor: 1.5,
          });
          console.log(this.#doc.getLineHeight());
        } else if (item.align === "center") {
          this.#doc.text(item.text, item.width / 2 + item.x, item.y, {
            align: item.align,
            maxWidth: item.width,
            lineHeightFactor: 1.5,
          });
        } else if (item.align === "right") {
          this.#doc.text(item.text, item.width + item.x, item.y, {
            align: item.align,
            maxWidth: item.width,
            lineHeightFactor: 1.5,
          });
        }
      }
    }

    this.#doc.output("pdfobjectnewwindow", { filename: "js.pdf" });
  }

  #mergeText() {
    const splitText = this.#splitText();
    const maxId = splitText[splitText.length - 1].id;
    const maxPage = splitText[splitText.length - 1].page;

    let arr = [];
    let stack = [];
    for (let p = 1; p <= maxPage; p++) {
      arr.push({ page: p, id: [] });
      for (let m = 1; m <= maxId; m++) {
        stack = [];
        for (let s = 0; s < splitText.length; s++) {
          const { id, text, x, y, page, align, lineHeight, fontSize, width } =
            splitText[s];

          if (p === page && m === id) {
            stack.push({ text, id, x, y, align, lineHeight, fontSize, width });
          }
        }
        if (stack.length !== 0) {
          arr[p - 1].id.push({
            text: stack.map((i) => i.text).join(" "),
            id: stack[0].id,
            x: stack[0].x,
            y: stack[0].y,
            align: stack[0].align,
            lineHeight: stack[0].lineHeight,
            fontSize: stack[0].fontSize,
            width: stack[0].width,
          });
        }
      }
    }

    return arr;
  }

  #splitText() {
    const options = this.state.options;

    let y = this.state.y;
    let page = 1;

    const arr = [];
    for (let o = 0; o < options.length; o++) {
      const option = options[o];

      const txt = option?.text || "";
      const x = option?.x || 10;
      const al = option?.align || "left";
      const fz = option?.font || 12;
      const lh = option?.lineHeight || 1.5;

      const pageWidth = this.#doc.internal.pageSize.getWidth();
      const pageHeight = this.#doc.internal.pageSize.getHeight();

      const usableWidth = pageWidth - x * 2;
      const marginBottom = this.state.y;
      this.#doc.setLineHeightFactor(lh);
      // const lineHeight = 7.65 / 2 + 1.5;
      const lineHeight = (fz - 3 + 0.65) / 2 + 1.5;

      const lines = this.#doc.splitTextToSize(txt, usableWidth, {
        align: al,
        fontSize: fz,
      });

      for (let l = 0; l < lines.length; l++) {
        let send = {};
        const line = lines[l];

        if (y + marginBottom > pageHeight) {
          this.#doc.addPage();
          page += 1;
          y = this.state.y;
        }

        send = {
          text: line,
          align: al,
          x,
          y,
          page,
          fontSize: fz,
          lineHeight: lh,
          id: o + 1,
          width: usableWidth,
        };

        arr.push(send);

        console.log(
          this.#doc.getLineHeight(),
          this.#doc.getLineHeightFactor(),
          this.#doc.getLineWidth()
          // lineHeight
        );
        y += lineHeight;
      }

      // if (o < options.length) {
      //   y += lineHeight;
      // }
    }

    return arr;
  }
}
