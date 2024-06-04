import Form from "@/app/ui/tasks/form";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    actCode: string,
    parcelId: string
  };
}) {
  return(
    <Form actCode={searchParams.actCode} parcelId={searchParams.parcelId} />
  )
}