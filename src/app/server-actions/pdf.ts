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

export async function parseAgreement(fileUrl: string) {
  const response = await fetch(`/api/agreement/parse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileUrl }),
  });

  return response.json();
}

export async function formatResult(result: PdfData) {
  const objects = result.body.objects;
  const options: { parcelNumber: string; code: string }[] = [];
  for (const object of objects) {
    const rows = object.rows;
    for (const row of rows) {
      if (row.column1.value.length === 10 && row.column2.value.length === 4) {
        options.push({
          parcelNumber: row.column1.value,
          code: row.column2.value,
        });
      }
    }
  }
  return options;
}
