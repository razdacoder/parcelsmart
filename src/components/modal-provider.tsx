import AddressDetailModal from "@/features/address/components/address-detail-modal";
import EditAddressModal from "@/features/address/components/edit-address-modal";
import NewAddressModal from "@/features/address/components/new-address-modal";
import EditPackageModal from "@/features/settings/components/edit-package-modal";
import NewPackageModal from "@/features/settings/components/new-package-modal";
import UpdatePasswordModal from "@/features/settings/components/update-password-modal";
import UpdateProfileModal from "@/features/settings/components/update-profile-modal";
import DropOffModal from "@/features/shipment/components/drop-off-modal";
import EditItemModal from "@/features/shipment/components/edit-item-modal";
import NewItemModal from "@/features/shipment/components/new-item-modal";
import ShipmentDetailModal from "@/features/shipment/components/shipment-detail-modal";
import TopUpModal from "@/features/wallet/components/top-up-modal";
import TransactionDetailModal from "@/features/wallet/components/transaction-detail-modal";
import { useMountedState } from "react-use";
import AlertPopUp from "./alert-modal-new";
export default function ModalProvider() {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <ShipmentDetailModal />
      <NewItemModal />
      <DropOffModal />
      <TransactionDetailModal />
      <NewAddressModal />
      <AddressDetailModal />
      <UpdateProfileModal />
      <UpdatePasswordModal />
      <EditAddressModal />
      <EditItemModal />
      <TopUpModal />
      <AlertPopUp />
      <NewPackageModal />
      <EditPackageModal />
    </>
  );
}
