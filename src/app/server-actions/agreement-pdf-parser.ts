import exampleResponse from "./response.json";

export interface PdfData {
  body: {
    objects: {
      rows: {
        column1: {
          pageIndex: number;
          value: string;
        };
        column2: {
          pageIndex: number;
          value: string;
        };
        column3: {
          pageIndex: number;
          value: string;
        };
        column4: {
          pageIndex: number;
          value: string;
        };
        column5: {
          pageIndex: number;
          value: string;
        };
        column6: {
          pageIndex: number;
          value: string;
        };
        column7: {
          pageIndex: number;
          value: string;
        };
      }[];
    }[];
  };
}

export async function parseAgreement(agreementUrl: string) {
  // const response = await fetch("https://api.pdf.co/v1/pdf/documentparser", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "x-api-key": process.env.PDF_CO_TOKEN!,
  //   },
  //   body: JSON.stringify({
  //     url: agreementUrl,
  //     outputFormat: "JSON",
  //     templateId: "9539",
  //     async: false,
  //     inline: "true",
  //     password: "",
  //     profiles: "",
  //   }),
  // });

  // const pdfData = await response.json() as PdfData;

  return formatResult(exampleResponse);
}

function formatResult(result: PdfData) {
  const objects = result.body.objects;
  const options: { parcelNumber: string; actionCode: string }[] = [];
  for (const object of objects) {
    const rows = object.rows;
    for (const row of rows) {
      if (row.column1.value.length === 10 && row.column2.value.length === 4) {
        options.push({
          parcelNumber: row.column1.value,
          actionCode: row.column2.value,
        });
      }
    }
  }
  return options;
}
