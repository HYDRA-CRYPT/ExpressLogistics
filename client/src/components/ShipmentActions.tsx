import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { EllipsisVertical } from "lucide-react";
import type { TableDelivery } from "@/types/shipment";
import { useDeleteDelivery } from "@/services/deliveryService"; // adjust path as needed

// Use a more flexible shipment type that matches your actual data

interface ShipmentActionsProps {
  shipment: TableDelivery; // Use the more flexible type
  onDelete: (id: string) => void;
  onEdit?: (shipment: TableDelivery) => void;
  onUpdateLocation?: (trackingCode: string) => void;
}

const ShipmentActions: React.FC<ShipmentActionsProps> = ({
  shipment,
  onDelete,
  onEdit,
  onUpdateLocation,
}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const deleteDelivery = useDeleteDelivery();

  const resolveDeliveryId = async (trackingCode: string) => {
    const token = localStorage.getItem("adminToken");
    const response = await fetch(`/api/deliveries/track/${trackingCode}/full`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to resolve delivery ID");
    const data = await response.json();
    return data._id || data.id;
  };

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    try {
      const deliveryId =
        shipment._id || (await resolveDeliveryId(shipment.trackingCode));
      await deleteDelivery.mutateAsync(deliveryId);
      onDelete(deliveryId); // Remove from UI
      toast.success(`Parcel ${shipment.trackingCode} removed successfully.`);
      setOpenAlert(false);
    } catch (err: unknown) {
      console.log("Error message", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to delete parcel. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shipment.trackingCode);
    toast.success(`Tracking code ${shipment.trackingCode} copied!`);
  };

  const handleUpdateLocation = () => {
    navigate(`/owner/shipments/track/${shipment.trackingCode}`);
  };

  const handleEdit = async () => {
    setIsEditLoading(true);
    try {
      const deliveryId =
        shipment._id || (await resolveDeliveryId(shipment.trackingCode));
      navigate(`/owner/shipments/edit/${deliveryId}`); // <-- FIXED
    } catch (err) {
      console.log("Error message", err);
      toast.error("Failed to resolve delivery for editing.");
    } finally {
      setIsEditLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-48 rounded-lg bg-white dark:bg-zinc-900 shadow-lg border border-gray-200 dark:border-zinc-700"
        >
          {onEdit && (
            <DropdownMenuItem
              className="hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer"
              onClick={handleEdit}
              disabled={isEditLoading}
            >
              {isEditLoading ? "Loading..." : "Edit Parcel"}
            </DropdownMenuItem>
          )}

          {onUpdateLocation && (
            <DropdownMenuItem
              className="hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer"
              onClick={handleUpdateLocation}
            >
              Update Location
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className="text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 cursor-pointer"
            onClick={() => setOpenAlert(true)}
          >
            Remove Parcel
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer"
            onClick={handleCopy}
          >
            Copy Tracking Code
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Alert Dialog for Remove */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Parcel</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{shipment.trackingCode}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isDeleteLoading}
            >
              {isDeleteLoading ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ShipmentActions;
