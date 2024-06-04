import prisma from "../src/app/lib/prisma";

async function main() {
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