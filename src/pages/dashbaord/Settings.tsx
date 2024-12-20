import AppNavBar from "@/components/app-navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import APIKeyView from "@/features/settings/components/api-keys-view";
import NotificationsView from "@/features/settings/components/notifications-view";
import PackagingView from "@/features/settings/components/packaging-view";
import ProfileView from "@/features/settings/components/profile-view";
import { useKycModal } from "@/features/settings/hooks/use-kyc-modal";
import { useNewPackage } from "@/features/settings/hooks/use-new-package";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [currentTab, setCurrentTab] = useState<
    "profile" | "packaging" | "api_keys" | "notifications"
  >("profile");
  const { onOpen } = useNewPackage();
  const { onOpen: openKycModal } = useKycModal();

  function callAction() {
    if (currentTab === "profile") {
      openKycModal();
      return;
    }
    if (currentTab === "packaging") {
      onOpen();
      return;
    }
  }
  return (
    <div className="flex flex-col gap-4 w-full overflow-hidden">
      <AppNavBar title="Settings" />
      <main className="px-4 md:px-8 space-y-6">
        <div className="bg-white rounded-lg py-4 lg:py-12 px-4 md:px-8">
          <div className="flex justify-between">
            <Tabs
              defaultValue={currentTab}
              className="w-full h-full flex flex-col gap-4 "
            >
              <TabsList className="bg-transparent px-0 h-full lg:mb-8 flex flex-col gap-2 lg:flex-row justify-between lg:justify-start items-center">
                <div className="flex items-center justify-between lg:justify-start w-full flex-wrap">
                  <TabsTrigger
                    onClick={() => setCurrentTab("profile")}
                    className="px-2 md:px-6 py-2"
                    value="profile"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setCurrentTab("packaging")}
                    className="px-2 md:px-6 py-2"
                    value="packaging"
                  >
                    Packaging
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setCurrentTab("api_keys")}
                    className="px-2 md:px-6 py-2"
                    value="apiKeys"
                  >
                    API Keys
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setCurrentTab("notifications")}
                    className="px-2 md:px-6 py-2"
                    value="notifications"
                  >
                    Notifications
                  </TabsTrigger>
                </div>
                {(currentTab === "profile" || currentTab === "packaging") && (
                  <Button
                    onClick={callAction}
                    className="w-full md:w-fit gap-2 items-center justify-self-end"
                  >
                    {currentTab === "profile" && "Complete KYC Verification"}
                    {currentTab === "packaging" && "Add Packaging"}
                    <ArrowRight className="size-4" />
                  </Button>
                )}
              </TabsList>
              <TabsContent value="profile" className="w-full bg">
                <ProfileView />
              </TabsContent>
              <TabsContent value="packaging">
                <PackagingView />
              </TabsContent>
              <TabsContent value="apiKeys">
                <APIKeyView />
              </TabsContent>
              <TabsContent value="notifications">
                <NotificationsView />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
