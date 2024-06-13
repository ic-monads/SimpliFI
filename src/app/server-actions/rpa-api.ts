export async function fetchLandParcels(sbi: string) {
    const url = `https://environment.data.gov.uk/data-services/RPA/LandParcels/wfs?version=2.0.0&request=GetFeature&typeNames=RPA:LandParcels&cql_filter=SBI=${sbi}&srsname=CRS:84&outputFormat=application/json`

    const response = await fetch(url);
    const data = await response.json();
    return data;
}