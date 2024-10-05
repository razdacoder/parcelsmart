import AddressDetailModal from "@/features/address/components/address-detail-modal";
import EditAddressModal from "@/features/address/components/edit-address-modal";
import NewAddressModal from "@/features/address/components/new-address-modal";
import UpdatePasswordModal from "@/features/settings/components/update-password-modal";
import UpdateProfileModal from "@/features/settings/components/update-profile-modal";
import DropOffModal from "@/features/shipment/components/drop-off-modal";
import NewItemModal from "@/features/shipment/components/new-item-modal";
import ShipmentDetailModal from "@/features/shipment/components/shipment-detail-modal";
import TrackModal from "@/features/track/components/track-modal";
import TransactionDetailModal from "@/features/wallet/components/transaction-detail-modal";
import { useMountedState } from "react-use";
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
      <TrackModal />
      <EditAddressModal />
    </>
  );
}
