import AppNavBar from "@/components/app-navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import APIKeyView from "@/features/settings/components/api-keys-view";
import CarrierView from "@/features/settings/components/carrier-view";
import PackagingView from "@/features/settings/components/packaging-view";
import ProfileView from "@/features/settings/components/profile-view";
import { ArrowRight } from "lucide-react";

export default function Settings() {
  return (
    <div className="flex flex-col gap-4 w-full overflow-hidden">
      <AppNavBar title="Settings" />
      <main className="px-4 md:px-8 space-y-6 ">
        <div className="bg-white rounded-lg py-12 px-8">
          <div className="flex justify-between">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="bg-transparent px-0 mb-8 flex justify-between items-center">
                <div>
                  <TabsTrigger className="px-6 py-2" value="profile">
                    Profile
                  </TabsTrigger>
                  <TabsTrigger className="px-6 py-2" value="packaging">
                    Packaging
                  </TabsTrigger>
                  <TabsTrigger className="px-6 py-2" value="carriers">
                    Carriers
                  </TabsTrigger>
                  <TabsTrigger className="px-6 py-2" value="apiKeys">
                    API Keys
                  </TabsTrigger>
                </div>
                <Button className="gap-2 items-center justify-self-end">
                  Complete KYC Verification <ArrowRight className="size-4" />
                </Button>
              </TabsList>
              <TabsContent value="profile" className="w-full bg">
                <ProfileView />
              </TabsContent>
              <TabsContent value="packaging">
                <PackagingView />
              </TabsContent>
              <TabsContent value="carriers">
                <CarrierView />
              </TabsContent>
              <TabsContent value="apiKeys">
                <APIKeyView />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
