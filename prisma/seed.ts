import { Prisma } from "@prisma/client";
import prisma from "../src/app/lib/prisma";
import { FeatureCollection } from "geojson";


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
        govUrl: "https://www.gov.uk/guidance/sfi-actions-for-farmland-wildlife-on-arable-and-horticultural-land#ahl1-pollen-and-nectar-flower-mix",
      },
      {
        code: "SAM1",
        name: "Assess and Record Soil Management",
        govUrl: "https://www.gov.uk/guidance/sfi-actions-for-soils#soil-1",
      },
      {
        code: "AHL4",
        name: "4m to 12m grass buffer strip",
        govUrl:
          "https://www.gov.uk/guidance/sfi-actions-for-buffer-strips#ahl4-4m-to-12m-grass-buffer-strip-on-arable-and-horticultural-land",
      },
      {
        code: "AHL2",
        name: "Winter Bird Food",
        govUrl: "https://www.gov.uk/guidance/sfi-actions-for-farmland-wildlife-on-arable-and-horticultural-land#ahl2-winter-bird-food-on-arable-and-horticultural-land",
      },
      {
        code: "AHL3",
        name: "Grassy field corners or blocks",
        govUrl: "https://www.gov.uk/guidance/sfi-actions-for-farmland-wildlife-on-arable-and-horticultural-land#ahl3-grassy-field-corners-or-blocks",
      },
      {
        code: "IPM4",
        name: "No Insecticide",
        govUrl: "https://www.gov.uk/guidance/sfi-actions-for-integrated-pest-management#ipm4-no-use-of-insecticide-on-arable-crops-and-permanent-crops",
      },
      {
        code: "IPM3",
        name: "Companion Crop on Arable and Horticultural Land",
        govUrl:
          "https://www.gov.uk/guidance/sfi-actions-for-integrated-pest-management#ipm3-companion-crop-on-arable-and-horticultural-land",
      },
      {
        code: "NUM3",
        name: "Legume Fallow",
        govUrl: "https://www.gov.uk/guidance/sfi-actions-for-nutrient-management#num3-legume-fallow",
      },
    ],
  });

  const farm = await prisma.farm.create({
    data: {
      name: "Bradshaw Farm",
      sbi: "106791068",
      agreementStart: new Date(2023, 5, 25),
      agreementUrl: ""
    },
  });

  const landParcels = await prisma.landParcel.createMany({
    data: [
      {
        id: "TF19063330",
        name: "Buildings 1",
        sbi: farm.sbi,
        feature: parcels.features[0]! as unknown as Prisma.JsonObject,
      },
      {
        id: "TF20051177",
        name: "Newborough",
        sbi: farm.sbi,
        feature: parcels.features[1]! as unknown as Prisma.JsonObject,
      },
      {
        id: "TF19050194",
        name: "Buildings 2",
        sbi: farm.sbi,
        feature: parcels.features[2]! as unknown as Prisma.JsonObject,
      },
      {
        id: "TF22006346",
        name: "Parnwell",
        sbi: farm.sbi,
        feature: parcels.features[3]! as unknown as Prisma.JsonObject,
      },
      {
        id: "TF18035592",
        name: "Gunthorpe",
        sbi: farm.sbi,
        feature: parcels.features[4]! as unknown as Prisma.JsonObject,
      },
      {
        id: "TF19051586",
        name: "Buildings 3",
        sbi: farm.sbi,
        feature: parcels.features[5]! as unknown as Prisma.JsonObject,
      },
      {
        id: "TF22003396",
        name: "Tesco",
        sbi: farm.sbi,
        feature: parcels.features[6]! as unknown as Prisma.JsonObject,
      },
      {
        id: "TF19061914",
        name: "Buildings 4",
        sbi: farm.sbi,
        feature: parcels.features[7]! as unknown as Prisma.JsonObject,
      },
    ],
  });

  const evidence = await prisma.evidence.createManyAndReturn({
    data: [
      { // TF20051177, AHL4
        title: 'Grass Buffer Photo',
        fileUrl: 'https://9c0ncerxleyeoepb.public.blob.vercel-storage.com/grass-buffer-WJ53SmyUKOvnyY9Nn9JHTFEx7juy5m.png',
        date: new Date(2024, 3, 12),
        notes: 'Grass buffer on the western edge of Newborough field facing away from the village.'
      },
      { // TF19063330, TF19050194, TF19051586, TF19061914, SAM1
        title: 'Buildings Soil Plan',
        fileUrl: 'https://9c0ncerxleyeoepb.public.blob.vercel-storage.com/Soil-Management-Plan-uQPhWeW1iUdyyD2TmNl9Xurtid1Xd0.jpg',
        date: new Date(2024, 6, 3),
        notes: 'Soil and organic matter management plan for the Buildings field block.'
      },
      { // TF18035592, AHL2
        title: 'Seed Mix Receipt',
        fileUrl: 'https://9c0ncerxleyeoepb.public.blob.vercel-storage.com/agriculture-invoice-kP06zc0NBt5rU3KUu08oDRYotEVbNl.jpeg',
        date: new Date(2024, 5, 10),
        notes: 'Receipt for the seed mix used for planting Gunthorpe Field.'
      },
      { // TF20051177, IPM4
        title: 'Pest Control Receipt',
        fileUrl: 'https://9c0ncerxleyeoepb.public.blob.vercel-storage.com/pest-control-template-RdMX8Jf61sXKXZgmgplth1RuAYalFc.png',
        date: new Date(2024, 4, 25),
        notes: 'Used pest control instead of insecticide.'
      }

    ]
  });

  const option = await prisma.option.createMany({
    data: [
      {
        actionCode: 'AHL4',
        parcelId: 'TF20051177',
      },
      {
        actionCode: 'SAM1',
        parcelId: 'TF19063330'
      },
      {
        actionCode: 'SAM1',
        parcelId: 'TF19050194'
      },
      {
        actionCode: 'SAM1',
        parcelId: 'TF19051586'
      },
      {
        actionCode: 'SAM1',
        parcelId: 'TF19061914'
      },
      {
        actionCode: 'AHL2',
        parcelId: 'TF18035592'
      },
      {
        actionCode: 'IPM4',
        parcelId: 'TF20051177'
      }
    ]
  });
  
  const optionEvidence = await prisma.optionEvidence.createMany({
    data: [
      {
        evId: evidence[0].id,
        actCode: 'AHL4',
        parcelId: 'TF20051177',
      },
      {
        evId: evidence[1].id,
        actCode: 'SAM1',
        parcelId: 'TF19063330'
      },
      {
        evId: evidence[1].id,
        actCode: 'SAM1',
        parcelId: 'TF19050194'
      },
      {
        evId: evidence[1].id,
        actCode: 'SAM1',
        parcelId: 'TF19051586'
      },
      {
        evId: evidence[1].id,
        actCode: 'SAM1',
        parcelId: 'TF19061914'
      },
      {
        evId: evidence[2].id,
        actCode: 'AHL2',
        parcelId: 'TF18035592'
      },
      {
        evId: evidence[3].id,
        actCode: 'IPM4',
        parcelId: 'TF20051177'
      }
    ]
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
