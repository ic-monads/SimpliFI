import SideNav from "@/app/components/SideNav";

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { sbi: string };
}) {
  const { sbi } = params;
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav sbi={sbi} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
