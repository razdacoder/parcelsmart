import AddressDetailModal from "@/features/address/components/address-detail-modal";
import NewAddressModal from "@/features/address/components/new-address-modal";
import DropOffModal from "@/features/shipment/components/drop-off-modal";
import NewItemModal from "@/features/shipment/components/new-item-modal";
import ShipmentDetailModal from "@/features/shipment/components/shipment-detail-modal";
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
    </>
  );
}
