import { Evidence, Prisma } from "@prisma/client";
import prisma from "../src/app/lib/prisma";
import { parseArgs } from "node:util";
import { FeatureCollection } from "geojson";

interface ParsedArgs {
  values: { [key: string]: any };
}

const args = parseArgs({
  options: {
    env: { type: "string" },
  },
}) as ParsedArgs;

const dev = args.values.env != "production";

async function main() {
  await prisma.task.deleteMany({});
  await prisma.evidence.deleteMany({});
  await prisma.option.deleteMany({});
  await prisma.landParcel.deleteMany({});
  await prisma.action.deleteMany({});
  await prisma.farm.deleteMany({});

  const response = await fetch(
    `https://environment.data.gov.uk/data-services/RPA/LandParcels/wfs?version=2.0.0&request=GetFeature&typeNames=RPA:LandParcels&cql_filter=SBI=106791068&srsname=CRS:84&outputFormat=application/json`
  );
  const geojson = await response.json();
  const parcels = geojson as FeatureCollection;

  const actions = await prisma.action.createMany({
    data: [
      {
        code: "AHL1",
        name: "Pollen and Nectar Flower Mix",
        govUrl: "https://www.gov.uk/find-funding-for-land-or-farms/AHL1-bumblebird-mix",
      },
      {
        code: "SAM1",
        name: "Assess and Record Soil Management",
        govUrl: "https://www.gov.uk/find-funding-for-land-or-farms/SAM1-assess-and-record-hedgerow-condition",
      },
      {
        code: "AHL4",
        name: "4m to 12m grass buffer strip",
        govUrl:
          "https://www.gov.uk/find-funding-for-land-or-farms/AHL4-assess-soil-produce-a-soil-management-plan-and-test-soil-organic-matter",
      },
      {
        code: "AHL2",
        name: "Winter Bird Food",
        govUrl: "https://www.gov.uk/find-funding-for-land-or-farms/AHL2-manage-ponds",
      },
      {
        code: "AHL3",
        name: "Grassy field corners or blocks",
        govUrl: "https://www.gov.uk/find-funding-for-land-or-farms/AHL3-grassy-field-corners-or-blocks",
      },
      {
        code: "IPM4",
        name: "No Insecticide",
        govUrl: "https://www.gov.uk/find-funding-for-land-or-farms/IPM4-cultivated-areas-for-arable-plants",
      },
      {
        code: "CIPM3",
        name: "Companion Crop on Arable and Horticultural Land",
        govUrl:
          "https://www.gov.uk/find-funding-for-land-or-farms/cipm3-companion-crop-on-arable-and-horticultural-land",
      },
      {
        code: "CNUM3",
        name: "Legume Fallow",
        govUrl: "https://www.gov.uk/find-funding-for-land-or-farms/cnum3-legume-fallow",
      },
      {
        code: "OFM4",
        name: "Organic Land Management - Rotational Land",
        govUrl: "https://www.gov.uk/find-funding-for-land-or-farms/ofm4-organic-land-management-rotational-land",
      },
    ],
  });

  const farm = await prisma.farm.create({
    data: {
      name: "Bradshaw Farm",
      sbi: "106791068",
      agreementStart: new Date(2024, 6, 12),
      agreementUrl: ""
    },
  });

  const landParcels = await prisma.landParcel.createMany({
    data: [
      {
        id: "AB123456",
        name: "Green Field",
        sbi: farm.sbi,
        feature: parcels.features[0]! as unknown as Prisma.JsonObject,
      },
      {
        id: "PG987654",
        name: "Flag Fen",
        sbi: farm.sbi,
        feature: parcels.features[1]! as unknown as Prisma.JsonObject,
      },
      {
        id: "ZM13579",
        name: "Box Moor",
        sbi: farm.sbi,
        feature: parcels.features[2]! as unknown as Prisma.JsonObject,
      },
    ],
  });

  const AHL1_green_field = {
    actionCode: "AHL1",
    parcelId: "AB123456",
  };

  const SAM1_green_field = {
    actionCode: "SAM1",
    parcelId: "AB123456",
  };

  const AHL4_flag_fen = {
    actionCode: "AHL4",
    parcelId: "PG987654",
  };

  const AHL1_flag_fen = {
    actionCode: "AHL1",
    parcelId: "PG987654",
  };

  const SAM1_box_moor = {
    actionCode: "SAM1",
    parcelId: "ZM13579",
  };

  const AHL4_box_moor = {
    actionCode: "AHL4",
    parcelId: "ZM13579",
  };

  const options = await prisma.option.createMany({
    data: [AHL1_green_field, SAM1_green_field, AHL4_flag_fen, AHL1_flag_fen, SAM1_box_moor, AHL4_box_moor],
  });

  const task = await prisma.task.create({
    data: {
      deadline: new Date(2024, 5, 15),
      title: "Planting Cover Crops",
      description: "Plant cover crops to improve soil health and prevent erosion.",
      actionCode: "AHL4",
      options: {
        create: [AHL4_flag_fen, AHL4_box_moor],
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 5, 20),
      title: "Fertilization",
      description: "Apply organic fertilizer to enhance soil fertility and promote plant growth.",
      actionCode: "SAM1",
      options: {
        create: SAM1_green_field,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 5, 25),
      title: "Irrigation Setup",
      description: "Set up an efficient irrigation system to ensure proper water supply to crops.",
      actionCode: "AHL1",
      options: {
        create: AHL1_flag_fen,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 6, 1),
      title: "Weed Control",
      description: "Implement measures to control weeds and minimize their impact on crops.",
      actionCode: "AHL4",
      options: {
        create: AHL4_flag_fen,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 5, 8),
      title: "Pest Monitoring",
      description: "Regularly monitor for pests and take necessary actions to control them.",
      actionCode: "AHL1",
      options: {
        create: [AHL1_green_field, AHL1_flag_fen],
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 6, 10),
      title: "Harvest Planning",
      description: "Plan the harvest schedule to ensure timely and efficient crop collection.",
      actionCode: "AHL4",
      options: {
        create: AHL4_flag_fen,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 6, 15),
      title: "Soil Testing",
      description: "Conduct soil tests to assess nutrient levels and make informed decisions.",
      actionCode: "SAM1",
      options: {
        create: SAM1_green_field,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 6, 20),
      title: "Mulching",
      description: "Apply mulch to retain soil moisture and suppress weed growth.",
      actionCode: "AHL1",
      options: {
        create: [AHL1_flag_fen, AHL1_green_field],
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 6, 25),
      title: "Compost Application",
      description: "Apply compost to enrich the soil with organic matter and nutrients.",
      actionCode: "SAM1",
      options: {
        create: SAM1_green_field,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 5, 18),
      title: "Pruning",
      description: "Prune plants to promote healthy growth and improve air circulation.",
      actionCode: "AHL4",
      options: {
        create: AHL4_flag_fen,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 7, 5),
      title: "Seed Saving",
      description: "Collect seeds from mature plants for future planting.",
      actionCode: "AHL4",
      options: {
        create: AHL4_flag_fen,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 6, 3),
      title: "Disease Management",
      description: "Monitor for diseases and apply treatments to prevent spread.",
      actionCode: "SAM1",
      options: {
        create: SAM1_green_field,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 7, 15),
      title: "Crop Rotation Planning",
      description: "Plan crop rotation to maintain soil health and reduce pest buildup.",
      actionCode: "SAM1",
      options: {
        create: SAM1_green_field,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 7, 20),
      title: "Organic Pest Control",
      description: "Use organic methods to control pests and minimize chemical use.",
      actionCode: "AHL4",
      options: {
        create: AHL4_flag_fen,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 6, 8),
      title: "Water Conservation",
      description: "Implement techniques to conserve water and reduce waste.",
      actionCode: "AHL1",
      options: {
        create: AHL1_flag_fen,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 8, 1),
      title: "Green Manure",
      description: "Incorporate green manure crops to improve soil structure and fertility.",
      actionCode: "SAM1",
      options: {
        create: SAM1_green_field,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 8, 5),
      title: "Field Mapping",
      description: "Create detailed maps of fields to optimize planting and management.",
      actionCode: "AHL1",
      options: {
        create: AHL1_green_field,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(),
      title: "Plan Soil Types",
      description: "Generate a map showing what soil type we have in each field section",
      actionCode: "AHL4",
      options: {
        create: AHL4_flag_fen,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 8, 10),
      title: "Cover Crop Termination",
      description: "Terminate cover crops to prepare fields for the next planting season.",
      actionCode: "AHL4",
      options: {
        create: AHL4_flag_fen,
      },
    },
  });

  await prisma.task.create({
    data: {
      deadline: new Date(2024, 8, 15),
      title: "Soil Erosion Control",
      description: "Implement measures to prevent soil erosion and maintain field integrity.",
      actionCode: "SAM1",
      options: {
        create: SAM1_green_field,
      },
    },
  });

  // let evidence: Evidence[] = [];
  // if (dev) {
  //   evidence = await prisma.evidence.createManyAndReturn({
  //     data: [
  //       {
  //         title: 'Soil Inspection',
  //         fileUrl: 'https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Sarah_Benoit_Delbecq_Indiana_1.jpg?crop=0%2C233%2C4000%2C2200&wid=2000&hei=1100&scl=2.0',
  //         // actCode: 'AHL4',
  //         // parcelId: 'PG987654'
  //       },
  //       {
  //         title: 'Soil Plan',
  //         fileUrl: 'https://ars.els-cdn.com/content/image/3-s2.0-B9780123869418000022-f02-08-9780123869418.jpg',
  //         // actCode: 'AHL4',
  //         // parcelId: 'PG987654',
  //         taskId: task.id
  //       },
  //       {
  //         title: 'Field Map',
  //         fileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6bO6HF46cmtaj27ZUpa-arz84OeX6i7KtYg&s',
  //         // actCode: 'AHL4',
  //         // parcelId: 'PG987654',
  //         taskId: task.id
  //       },
  //       {
  //         title: 'Soil Profile',
  //         fileUrl: 'https://www.researchgate.net/publication/344607020/figure/fig2/AS:1022807496482818@1620867718338/Soil-profile-with-measurements-in-inches-Reprinted-from.jpg',
  //         // actCode: 'AHL4',
  //         // parcelId: 'PG987654'
  //       }
  //     ]
  //   });
  //   const optionEvidence = await prisma.optionEvidence.createMany({
  //     data: [
  //       {
  //         evId: evidence[0].id,
  //         actCode: 'AHL4',
  //         parcelId: 'PG987654'
  //       },
  //       {
  //         evId: evidence[1].id,
  //         actCode: 'AHL4',
  //         parcelId: 'PG987654'
  //       },
  //       {
  //         evId: evidence[2].id,
  //         actCode: 'AHL4',
  //         parcelId: 'PG987654'
  //       },
  //       {
  //         evId: evidence[3].id,
  //         actCode: 'AHL4',
  //         parcelId: 'PG987654'
  //       },
  //       { // Store purchase orders shared on two fields
  //         evId: evidence[3].id,
  //         actCode: 'AHL4',
  //         parcelId: 'ZM13579'
  //       }
  //     ]
  //   });
  // }

  const required = await prisma.requiredEvidence.createMany({
    data: [
      {
        title: "Produce Soil Report",
        desc: "Compile all evidence into report",
        // evId: dev ? evidence[0].id : null,
        taskId: task.id,
      },
      {
        title: "Store Purchase Orders",
        desc: "Download and store all soil receipts",
        taskId: task.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
