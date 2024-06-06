import prisma from "../src/app/lib/prisma";
import { parseArgs } from "node:util";

// To seed dev database with evidence:
// npx prisma db seed -- --env development

interface ParsedArgs {
  values: { [key: string]: any };
}

const args = parseArgs({
  options: {
    env: { type: 'string' }
  }
}) as ParsedArgs

const dev = args.values.env == 'development';

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
        deadline: new Date(2024, 6, 10),
        title: "Soil Preparation",
        description: "Ensure the soil is well-prepared for planting by removing debris and tilling.",
        actCode: "AHW1",
        parcelId: "AB123456"
      },
      {
        deadline: new Date(2024, 6, 15),
        title: "Planting Cover Crops",
        description: "Plant cover crops to improve soil health and prevent erosion.",
        actCode: "CSAM1",
        parcelId: "PG987654"
      },
      {
        deadline: new Date(2024, 6, 20),
        title: "Fertilization",
        description: "Apply organic fertilizer to enhance soil fertility and promote plant growth.",
        actCode: "CHRW1",
        parcelId: "AB123456"
      },
      {
        deadline: new Date(2024, 6, 25),
        title: "Irrigation Setup",
        description: "Set up an efficient irrigation system to ensure proper water supply to crops.",
        actCode: "AHW1",
        parcelId: "PG987654"
      },
      {
        deadline: new Date(2024, 7, 1),
        title: "Weed Control",
        description: "Implement measures to control weeds and minimize their impact on crops.",
        actCode: "CSAM1",
        parcelId: "ZM13579"
      },
      {
        deadline: new Date(2024, 6, 8),
        title: "Pest Monitoring",
        description: "Regularly monitor for pests and take necessary actions to control them.",
        actCode: "AHW1",
        parcelId: "AB123456"
      },
      {
        deadline: new Date(2024, 7, 10),
        title: "Harvest Planning",
        description: "Plan the harvest schedule to ensure timely and efficient crop collection.",
        actCode: "CSAM1",
        parcelId: "PG987654"
      },
      {
        deadline: new Date(2024, 7, 15),
        title: "Soil Testing",
        description: "Conduct soil tests to assess nutrient levels and make informed decisions.",
        actCode: "CHRW1",
        parcelId: "ZM13579"
      },
      {
        deadline: new Date(2024, 7, 20),
        title: "Mulching",
        description: "Apply mulch to retain soil moisture and suppress weed growth.",
        actCode: "AHW1",
        parcelId: "PG987654"
      },
      {
        deadline: new Date(2024, 7, 25),
        title: "Compost Application",
        description: "Apply compost to enrich the soil with organic matter and nutrients.",
        actCode: "CHRW1",
        parcelId: "AB123456"
      },
      {
        deadline: new Date(2024, 6, 18),
        title: "Pruning",
        description: "Prune plants to promote healthy growth and improve air circulation.",
        actCode: "CSAM1",
        parcelId: "ZM13579"
      },
      {
        deadline: new Date(2024, 8, 5),
        title: "Seed Saving",
        description: "Collect seeds from mature plants for future planting.",
        actCode: "CSAM1",
        parcelId: "PG987654"
      },
      {
        deadline: new Date(2024, 7, 3),
        title: "Disease Management",
        description: "Monitor for diseases and apply treatments to prevent spread.",
        actCode: "CHRW1",
        parcelId: "ZM13579"
      },
      {
        deadline: new Date(2024, 8, 15),
        title: "Crop Rotation Planning",
        description: "Plan crop rotation to maintain soil health and reduce pest buildup.",
        actCode: "CHRW1",
        parcelId: "AB123456"
      },
      {
        deadline: new Date(2024, 8, 20),
        title: "Organic Pest Control",
        description: "Use organic methods to control pests and minimize chemical use.",
        actCode: "CSAM1",
        parcelId: "ZM13579"
      },
      {
        deadline: new Date(2024, 7, 8),
        title: "Water Conservation",
        description: "Implement techniques to conserve water and reduce waste.",
        actCode: "AHW1",
        parcelId: "PG987654"
      },
      {
        deadline: new Date(2024, 9, 1),
        title: "Green Manure",
        description: "Incorporate green manure crops to improve soil structure and fertility.",
        actCode: "CHRW1",
        parcelId: "ZM13579"
      },
      {
        deadline: new Date(2024, 9, 5),
        title: "Field Mapping",
        description: "Create detailed maps of fields to optimize planting and management.",
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
      },
      {
        deadline: new Date(2024, 9, 10),
        title: "Cover Crop Termination",
        description: "Terminate cover crops to prepare fields for the next planting season.",
        actCode: "CSAM1",
        parcelId: "PG987654"
      },
      {
        deadline: new Date(2024, 9, 15),
        title: "Soil Erosion Control",
        description: "Implement measures to prevent soil erosion and maintain field integrity.",
        actCode: "CHRW1",
        parcelId: "AB123456"
      }
    ]
  });

  if (dev) {
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
  }

  const required = await prisma.requiredEvidence.createMany({
    data: [
      {
        title: 'Produce Soil Report',
        desc: 'Compile all evidence into report',
        evId: dev ? 'cjld2cyuq0000t3rmniod1foy' : null,
        taskId: 'cjld2cjxh0000qzrmn831i7rn'
      },
      {
        title: 'Store Purchase Orders',
        desc: 'Download and store all soil receipts',
        taskId: 'cjld2cjxh0000qzrmn831i7rn'
      }
    ]
    
  });
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