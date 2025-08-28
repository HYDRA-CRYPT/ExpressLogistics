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
import { toast } from "sonner";
import { EllipsisVertical } from "lucide-react";

// Import the new CardDelivery type
import type { CardDelivery } from "@/types/shipment";

interface ShipmentActionsProps {
  shipment: CardDelivery; // Use CardDelivery type for cards
  onDelete: (id: string) => void;
  onEdit?: (shipment: CardDelivery) => void;
  onUpdateLocation?: (trackingCode: string) => void;
}

const ShipmentActionCard: React.FC<ShipmentActionsProps> = ({
  shipment,
  onDelete,
  onEdit,
  onUpdateLocation,
}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(shipment._id);
    toast.success(`Parcel ${shipment.trackingCode} removed successfully.`);
    setOpenAlert(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shipment.trackingCode);
    toast.success(`Tracking code ${shipment.trackingCode} copied!`);
  };

  const handleUpdateLocation = () => {
    navigate(`/owner/shipments/track/${shipment.trackingCode}`);
  };

  const handleEdit = () => {
    navigate(`/owner/shipments/edit/${shipment.trackingCode}`, {
      state: shipment, // Send full shipment data to EditShipment page
    });
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
            >
              Edit Parcel
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
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ShipmentActionCard;
