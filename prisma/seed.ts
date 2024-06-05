import prisma from "../src/app/lib/prisma";

async function main() {
  await prisma.task.deleteMany({});
  await prisma.evidence.deleteMany({});
  await prisma.option.deleteMany({});
  await prisma.landParcel.deleteMany({});
  await prisma.action.deleteMany({});

  const actions = await prisma.action.createMany({
    data: [
      {
        code: 'AHW1',
        name: 'Bumblebird mix',
        govUrl: 'https://www.gov.uk/find-funding-for-land-or-farms/ahw1-bumblebird-mix',
      },
      {
        code: 'CHRW1',
        name: 'Assess and record hedgerow condition',
        govUrl: 'https://www.gov.uk/find-funding-for-land-or-farms/chrw1-assess-and-record-hedgerow-condition',
      },
      {
        code: 'CSAM1',
        name: 'Soil Assessment and Management Plan',
        govUrl: 'https://www.gov.uk/find-funding-for-land-or-farms/csam1-assess-soil-produce-a-soil-management-plan-and-test-soil-organic-matter',
      }
    ],
  });
  
  const landParcels = await prisma.landParcel.createMany({
    data: [
      {
        id: 'AB123456',
        name: 'Green Field',
      },
      {
        id: 'PG987654',
        name: 'Flag Fen',
      },
      {
        id: 'ZM13579',
        name: 'Box Moor',
      }
    ],
  });
  const options = await prisma.option.createMany({
    data: [
      {
        actionCode: 'AHW1',
        parcelId: 'AB123456'
      },
      {
        actionCode: 'CHRW1',
        parcelId: 'AB123456'
      },
      {
        actionCode: 'CSAM1',
        parcelId: 'PG987654'
      },
      {
        actionCode: 'AHW1',
        parcelId: 'PG987654'
      },
      {
        actionCode: 'CHRW1',
        parcelId: 'ZM13579'
      },
      {
        actionCode: 'CSAM1',
        parcelId: 'ZM13579'
      },
    ]
  });

  const tasks = await prisma.task.createMany({
    data: [
      {
        deadline: new Date(),
        title: "First Cut",
        description: `Cutting emerging flowers and weeds regularly during the first 12 months after sowing will help to control weeds, so the sown plants can establish. Cut at a height which removes the top growth of any weeds, avoids dislodging the roots of the seedlings and prevents harm to wildlife. If you're cutting the margin, block or strip: 
                      check it for signs of nesting birds before you cut it - birds, nests and eggs are protected by law, so if you see signs of nesting birds, delay cutting until the birds fledge
                      remove the cut vegetation, where possible, to help reduce the risk of it smothering the flower species and limit weeds - if it's impractical to do this, you can finely chop them and spread them as thinly as possible`,
        actCode: "AHW1",
        parcelId: "AB123456"
      },
      {
        id: 'cjld2cjxh0000qzrmn831i7rn',
        deadline: new Date(),
        title: "Plan Soil Types",
        description: "Generate a map showing what soil type we have in each field section",
        actCode: 'CSAM1',
        parcelId: 'PG987654'
      }
    ]
  });

  const evidence = await prisma.evidence.createMany({
    data: [
      {
        title: 'Soil Inspection',
        fileUrl: 'https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Sarah_Benoit_Delbecq_Indiana_1.jpg?crop=0%2C233%2C4000%2C2200&wid=2000&hei=1100&scl=2.0',
        actCode: 'CSAM1',
        parcelId: 'PG987654'
      },
      {
        id: 'cjld2cyuq0000t3rmniod1foy',
        title: 'Soil Plan',
        fileUrl: 'https://ars.els-cdn.com/content/image/3-s2.0-B9780123869418000022-f02-08-9780123869418.jpg',
        actCode: 'CSAM1',
        parcelId: 'PG987654',
        taskId:   'cjld2cjxh0000qzrmn831i7rn'
      },
      {
        title: 'Field Map',
        fileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6bO6HF46cmtaj27ZUpa-arz84OeX6i7KtYg&s',
        actCode: 'CSAM1',
        parcelId: 'PG987654',
        taskId: 'cjld2cjxh0000qzrmn831i7rn'
      },
      {
        title: 'Soil Profile',
        fileUrl: 'https://www.researchgate.net/publication/344607020/figure/fig2/AS:1022807496482818@1620867718338/Soil-profile-with-measurements-in-inches-Reprinted-from.jpg',
        actCode: 'CSAM1',
        parcelId: 'PG987654'
      }
    ]
  });

  const required = await prisma.requiredEvidence.createMany({
    data: [
      {
        title: 'Produce Soil Report',
        desc: 'Compile all evidence into report',
        evId: 'cjld2cyuq0000t3rmniod1foy',
        taskId: 'cjld2cjxh0000qzrmn831i7rn'
      },
      {
        title: 'Store Purchase Orders',
        desc: 'Download and store all soil receipts',
        taskId: 'cjld2cjxh0000qzrmn831i7rn'
      }
    ]
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });