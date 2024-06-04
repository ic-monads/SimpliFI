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
  })

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