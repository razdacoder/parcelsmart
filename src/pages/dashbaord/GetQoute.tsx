import AppNavBar from "@/components/app-navbar";
import QouteForm from "@/features/qoute/forms/qoute-form";

export default function GetQoute() {
  return (
    <div className="flex flex-col gap-4 w-full overflow-hidden">
      <AppNavBar title="Get Quote" />
      <main className="px-4 md:px-8 space-y-6">
        <div className="bg-white py-12 px-8">
          <QouteForm />
        </div>
      </main>
    </div>
  );
}
