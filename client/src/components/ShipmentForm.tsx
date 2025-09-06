import React, { useState } from "react";
import {
  Package,
  MapPin,
  CreditCard,
  FileText,
  ChevronLeft,
} from "lucide-react";

import DatePickerDemo from "../components/date-time";
import { currencies } from "../assets/data/api";
import { Checkbox } from "@/components/ui/checkbox";
import LocationAutocomplete from "./LocationAutocomplete";
import type { CreateShipmentData } from "@/types/shipmentTypes";

interface ShipmentData {
  shipmentType: string;
  pickupDate: string;
  deliveryDate: string;
  status: string;
  sender: {
    name: string;
    city: string;
    country: string;
    location: string; // Combined city, country
    phone: string;
    address: string;
    email: string;
  };
  receiver: {
    name: string;
    city: string;
    country: string;
    location: string; // Combined city, country
    phone: string;
    address: string;
    email: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    weight: number;
    value: number;
  }>;
  deliveryFee: number;
  currency: { code: string; symbol: string; name: string };
  checkEmail: boolean;
}
// Updated ShipmentForm props interface
interface ShipmentFormProps {
  initialData?: Partial<CreateShipmentData>;
  onSubmit?: (data: Partial<CreateShipmentData>) => void | Promise<void>;
  isLoading?: boolean;
  isEditing?: boolean;
}

const SHIPMENT_TYPES = ["Parcel", "Document", "Freight", "Other"];

const DELIVERY_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "In Transit",
  "On Hold",
  "Delivered",
];

const ShipmentForm: React.FC<ShipmentFormProps> = ({
  initialData = {},
  onSubmit,
  isLoading = false,
  isEditing = false,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [autoEmail, setAutoEmail] = useState<boolean>(
    initialData?.checkEmail ?? true // Default to true for email notifications
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [formData, setFormData] = useState<ShipmentData>({
    shipmentType: initialData?.shipmentType ?? "Parcel",
    pickupDate: initialData?.pickupDate ?? "",
    deliveryDate: initialData?.deliveryDate ?? "",
    status: initialData?.status ?? "Pending",
    sender: {
      name: initialData?.sender?.name ?? "",
      city: initialData?.sender?.city ?? "",
      country: initialData?.sender?.country ?? "",
      location:
        initialData?.sender?.city && initialData?.sender?.country
          ? `${initialData.sender.city}, ${initialData.sender.country}`
          : "",
      phone: initialData?.sender?.phone ?? "",
      address: initialData?.sender?.address ?? "",
      email: initialData?.sender?.email ?? "",
    },
    receiver: {
      name: initialData?.receiver?.name ?? "",
      city: initialData?.receiver?.city ?? "",
      country: initialData?.receiver?.country ?? "",
      location:
        initialData?.receiver?.city && initialData?.receiver?.country
          ? `${initialData.receiver.city}, ${initialData.receiver.country}`
          : "",
      phone: initialData?.receiver?.phone ?? "",
      address: initialData?.receiver?.address ?? "",
      email: initialData?.receiver?.email ?? "",
    },
    items: initialData?.items ?? [
      {
        description: "",
        quantity: 1,
        weight: 0,
        value: 0,
      },
    ],
    deliveryFee: initialData?.deliveryFee ?? 0,
    currency: initialData?.currency ?? {
      code: "USD",
      symbol: "$",
      name: "US Dollar",
    },
    checkEmail: initialData?.checkEmail ?? true, // Default to true for email notifications
  });

  console.log("Form Data ==>", formData);

  // Validation function to check all required fields
  const validateForm = (): string[] => {
    const errors: string[] = [];

    // Check shipment type
    if (!formData.shipmentType.trim()) {
      errors.push("Shipment type is required");
    }

    // Check dates
    if (!formData.pickupDate) {
      // Auto-set pickup date to today if not provided
      const today = new Date().toISOString();
      setFormData((prev) => ({ ...prev, pickupDate: today }));
    }
    if (!formData.deliveryDate) {
      errors.push("Delivery date is required"); // Keep this required
    }

    // Sender information - made optional (removed required checks)
    if (!formData.sender.name.trim()) {
      errors.push("Sender name is required");
    }
    // if (!formData.sender.location.trim()) {
    //   errors.push("Sender location is required");
    // }
    // Sender phone is optional
    // if (!formData.sender.phone.trim()) {
    //   errors.push("Sender phone is required");
    // }
    // if (!formData.sender.address.trim()) {
    //   errors.push("Sender address is required");
    // }
    if (!formData.sender.email.trim()) {
      errors.push("Sender email is required");
    }

    // Receiver information - made optional (removed required checks)
    if (!formData.receiver.name.trim()) {
      errors.push("Receiver name is required");
    }
    if (!formData.receiver.location.trim()) {
      errors.push("Receiver location is required");
    }
    // Receiver phone is optional
    // if (!formData.receiver.phone.trim()) {
    //   errors.push("Receiver phone is required");
    // }
    // if (!formData.receiver.address.trim()) {
    //   errors.push("Receiver address is required");
    // }
    if (!formData.receiver.email.trim()) {
      errors.push("Receiver email is required");
    }

    // Check items
    if (formData.items.length === 0) {
      errors.push("At least one item is required");
    } else {
      formData.items.forEach((item, index) => {
        // Item description is optional now, set default if empty
        if (!item.description.trim()) {
          const updatedItems = [...formData.items];
          updatedItems[index] = { ...item, description: "General Item" };
          setFormData((prev) => ({ ...prev, items: updatedItems }));
        }
        if (item.quantity <= 0) {
          errors.push(`Item ${index + 1} quantity must be greater than 0`);
        }
        // Weight and value can be 0 or negative - no validation needed
      });
    }

    // Delivery fee can be 0 or negative - no validation needed

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    setValidationErrors(errors);

    if (errors.length > 0) {
      setShowErrors(true);
      return;
    }

    setShowErrors(false);
    onSubmit?.(formData);
  };

  const steps = [
    { id: 1, name: "Shipment Type", icon: Package },
    { id: 2, name: "Addresses", icon: MapPin },
    { id: 3, name: "Package Details", icon: Package },
    { id: 4, name: "Review", icon: CreditCard },
  ];

  const getCompletionPercentage = () => {
    return (currentStep / 4) * 100;
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = <K extends keyof ShipmentData>(
    field: K,
    value: ShipmentData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear errors when user starts typing
    if (showErrors) {
      setShowErrors(false);
      setValidationErrors([]);
    }
  };

  const handleItemChange = (
    index: number,
    field: keyof ShipmentData["items"][0],
    value: string | number
  ) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, items: updatedItems }));

    // Clear errors when user starts typing
    if (showErrors) {
      setShowErrors(false);
      setValidationErrors([]);
    }
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "",
          category: "General Merchandise",
          quantity: 1,
          weight: 0,
          value: 0,
        },
      ],
    }));
  };

  // Helper function to handle location changes and update city/country
  const handleLocationChange = (
    field: "sender" | "receiver",
    location: string
  ) => {
    // Parse location string to extract city and country
    const parts = location.split(", ");
    let city = "";
    let country = "";

    if (parts.length >= 2) {
      city = parts[0].trim();
      country = parts[parts.length - 1].trim();
    } else if (parts.length === 1) {
      city = parts[0].trim();
    }

    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        location,
        city,
        country,
      },
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-4 sm:space-y-6 lg:p-4 p-2 sm:p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900">
      <div className="flex items-center space-x-2 mb-4">
        <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
          Shipment Type & Priority
        </h2>
      </div>
      <p className="text-zinc-700 dark:text-zinc-400 text-sm mb-4 sm:mb-6">
        Select the type of shipment and delivery priority
      </p>

      <div className="space-y-4 sm:space-y-6">
        <div>
          <h3 className="text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-3">
            Shipment Type
          </h3>
          <div className="space-y-2">
            {SHIPMENT_TYPES.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="shipmentType"
                  value={type}
                  checked={formData.shipmentType === type}
                  onChange={(e) =>
                    handleInputChange("shipmentType", e.target.value)
                  }
                  className="mr-3 text-blue-600 dark:text-blue-500 focus:ring-blue-600 dark:focus:ring-blue-500"
                />
                <span className="text-zinc-900 dark:text-zinc-300">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
              Pickup Date
              <span className="text-zinc-500 dark:text-zinc-400 text-xs ml-2">
                (Today's date will be used if not selected)
              </span>
            </label>
            <DatePickerDemo
              value={formData.pickupDate}
              onChange={(newValue) =>
                setFormData((prev) => ({ ...prev, pickupDate: newValue }))
              }
              allowTimeSelection={false} // Date-only for pickup
            />
          </div>

          <div>
            <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
              Preferred Delivery Date
            </label>
            <DatePickerDemo
              value={formData.deliveryDate}
              onChange={(newValue) =>
                setFormData((prev) => ({ ...prev, deliveryDate: newValue }))
              }
              allowTimeSelection={false} // Date-only for delivery
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 sm:space-y-8 p-0 lg:p-4 sm:p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900">
      {/* Sender Address */}
      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
          Sender Address
        </h2>
      </div>
      <p className="text-zinc-700 dark:text-zinc-400 text-sm mb-4 sm:mb-6">
        Enter the pickup location details
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
              Sender Name
            </label>
            <input
              type="text"
              value={formData.sender.name}
              onChange={(e) =>
                handleInputChange("sender", {
                  ...formData.sender,
                  name: e.target.value,
                })
              }
              className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
              placeholder="Enter sender name"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
              Sender Address
            </label>
            <input
              type="text"
              value={formData.sender.address}
              onChange={(e) =>
                handleInputChange("sender", {
                  ...formData.sender,
                  address: e.target.value,
                })
              }
              className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
              placeholder="Enter sender address"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <LocationAutocomplete
            label="Sender Location"
            value={formData.sender.location}
            onChange={(location) => handleLocationChange("sender", location)}
            placeholder="Search for sender's city, country..."
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.sender.phone}
              onChange={(e) =>
                handleInputChange("sender", {
                  ...formData.sender,
                  phone: e.target.value,
                })
              }
              className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.sender.email}
              onChange={(e) =>
                handleInputChange("sender", {
                  ...formData.sender,
                  email: e.target.value,
                })
              }
              className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
              placeholder="Enter email address"
            />
          </div>
        </div>
      </div>

      {/* Receiver Address */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-300 dark:border-zinc-700">
        <div className="flex items-center space-x-2 mb-4 sm:mb-6">
          <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
            Receiver Address
          </h2>
        </div>
        <p className="text-zinc-700 dark:text-zinc-400 text-sm mb-4 sm:mb-6">
          Enter the delivery location details
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
                Receiver Name
              </label>
              <input
                type="text"
                value={formData.receiver.name}
                onChange={(e) =>
                  handleInputChange("receiver", {
                    ...formData.receiver,
                    name: e.target.value,
                  })
                }
                className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
                placeholder="Enter contact name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
                Receiver Address
              </label>
              <input
                type="text"
                value={formData.receiver.address}
                onChange={(e) =>
                  handleInputChange("receiver", {
                    ...formData.receiver,
                    address: e.target.value,
                  })
                }
                className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
                placeholder="Enter receiver address"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <LocationAutocomplete
              label="Receiver Location"
              value={formData.receiver.location}
              onChange={(location) =>
                handleLocationChange("receiver", location)
              }
              placeholder="Search for receiver's city, country..."
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.receiver.phone}
                onChange={(e) =>
                  handleInputChange("receiver", {
                    ...formData.receiver,
                    phone: e.target.value,
                  })
                }
                className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.receiver.email}
                onChange={(e) =>
                  handleInputChange("receiver", {
                    ...formData.receiver,
                    email: e.target.value,
                  })
                }
                className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
                placeholder="Enter email address"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
          Package Details
        </h2>
      </div>
      <p className="text-zinc-700 dark:text-zinc-400 text-sm mb-6">
        Add items to your shipment
      </p>

      <div className="space-y-6">
        {formData.items.map((item, index) => (
          <div
            key={index}
            className="border border-zinc-300 dark:border-zinc-600 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-800"
          >
            <h3 className="text-zinc-900 dark:text-white font-medium mb-4">
              Item {index + 1}
            </h3>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  className="w-full bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
                  placeholder="Enter item description"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "quantity",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  value={item.weight}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "weight",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
                  step="1"
                />
              </div>
              <div>
                <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
                  Value ({formData.currency.symbol})
                </label>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) =>
                    handleItemChange(index, "value", parseFloat(e.target.value))
                  }
                  className="w-full bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
                  step="1"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Currency Selector */}
        <div className="border border-zinc-300 dark:border-zinc-600 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-800">
          <h3 className="text-zinc-900 dark:text-white font-medium mb-4">
            Currency
          </h3>
          <div>
            <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
              Select Currency
            </label>
            <select
              value={formData.currency.code}
              onChange={(e) => {
                const selectedCurrency = currencies.find(
                  (c) => c.code === e.target.value
                );
                if (selectedCurrency)
                  handleInputChange("currency", selectedCurrency);
              }}
              className="w-full bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.symbol} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={addItem}
          className="w-full border border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg py-3 text-blue-600 dark:text-blue-400 hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          + Add Another Item
        </button>

        {/* Summary */}
        <div className="bg-zinc-100 dark:bg-zinc-700 rounded-lg p-4 mt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                {formData.items.length}
              </div>
              <div className="text-zinc-700 dark:text-zinc-400 text-sm">
                Total Items
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                {formData.items
                  .reduce((sum, item) => sum + item.weight, 0)
                  .toFixed(1)}{" "}
                lbs
              </div>
              <div className="text-zinc-700 dark:text-zinc-400 text-sm">
                Total Weight
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                {formData.currency.symbol}
                {formData.items
                  .reduce((sum, item) => sum + item.value, 0)
                  .toFixed(2)}
              </div>
              <div className="text-zinc-700 dark:text-zinc-400 text-sm">
                Total Value
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delivery Fee */}
      <div className="border border-zinc-300 dark:border-zinc-600 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-800">
        <h3 className="text-zinc-900 dark:text-white font-medium mb-4">
          Delivery Fee
        </h3>
        <div>
          <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
            Enter Delivery Fee ({formData.currency.symbol})
          </label>
          <input
            type="number"
            value={formData.deliveryFee}
            onChange={(e) =>
              handleInputChange("deliveryFee", parseFloat(e.target.value))
            }
            className="w-full bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
            step="0.01"
            min="0"
            placeholder="Enter delivery fee"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => {
    const totalWeight = formData.items.reduce(
      (sum, item) => sum + item.weight,
      0
    );
    const totalValue = formData.items.reduce(
      (sum, item) => sum + item.value,
      0
    );
    const baseShipping = 0.0;
    const weightCharge = totalWeight * 2.5;
    const deliveryFee = formData.deliveryFee || 0; // <-- Added delivery fee
    const totalCost = baseShipping + weightCharge + deliveryFee; // <-- Include delivery fee

    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
            Review & Cost Estimate
          </h2>
        </div>
        <p className="text-zinc-700 dark:text-zinc-400 text-sm mb-4 sm:mb-6">
          Review your shipment details and get a cost estimate
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Shipment Summary */}
          <div className="space-y-4">
            <h3 className="text-yellow-600 dark:text-yellow-400 text-lg font-medium">
              Shipment Summary
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Type:</span>
                <span className="text-zinc-900 dark:text-white">
                  {formData.shipmentType}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">Pickup Date:</span>
                <span className="text-white">
                  {formData.pickupDate || "Today's date"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Delivery Date:</span>
                <span className="text-white">
                  {formData.deliveryDate || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Items:</span>
                <span className="text-white">{formData.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Weight:</span>
                <span className="text-white">{totalWeight.toFixed(1)} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Value:</span>
                <span className="text-white">
                  {formData.currency.symbol}
                  {totalValue.toFixed(2)} {formData.currency.code}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Status:</span>
                <span className="text-white font-medium">
                  {formData.status}
                </span>
              </div>
            </div>

            {/* Status Selection */}
            <div className="pt-4 border-t border-zinc-700">
              <h4 className="text-white font-medium mb-3">Delivery Status</h4>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">
                  Set initial status for this shipment
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {DELIVERY_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-zinc-400 mt-1">
                  This status will be used for email notifications and tracking
                  updates
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-700">
              <h4 className="text-white font-medium mb-2">Route</h4>
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <span className="text-zinc-400 text-sm w-12">From:</span>
                  <div className="text-white flex gap-1">
                    {formData.sender.city || "Sender City"},
                    {formData.sender.country || "Sender Country"}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-zinc-400 text-sm w-12">To:</span>
                  <div className="text-white flex gap-1">
                    {formData.receiver.city || "Receiver City"},
                    {formData.receiver.country || "Receiver Country"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-4">
            <h3 className="text-yellow-400 text-lg font-medium">
              Cost Breakdown
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-400">Base Shipping:</span>
                <span className="text-white">${baseShipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Weight Charges:</span>
                <span className="text-white">${weightCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Delivery Fee:</span>
                <span className="text-white">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-zinc-600 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-white">Total Estimated Cost:</span>
                  <span className="text-white">${totalCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-3 sm:p-6 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Create New Shipment
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Follow the steps below to create and schedule your shipment
          </p>
        </div>

        {/* Progress Section */}
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <div className="text-zinc-900 dark:text-zinc-100">
              <span className="text-sm">Step {currentStep} of 4</span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {getCompletionPercentage()}% Complete
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 mb-4 sm:mb-6">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${getCompletionPercentage()}%` }}
            ></div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between space-x-2">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                    currentStep >= step.id
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {currentStep > step.id ? "✓" : step.id}
                </div>
                <span
                  className={`mt-1 sm:mt-2 text-xs text-center leading-tight ${
                    currentStep >= step.id
                      ? "text-blue-500"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {showErrors && validationErrors.length > 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Please fix the following errors:
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <ul className="list-disc pl-5 space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 sm:p-8 mb-6 sm:mb-8 transition-colors">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between space-y-4 sm:space-y-0">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 rounded-lg transition-colors mt-2 order-2 sm:order-1 ${
              currentStep === 1
                ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                : "bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-600"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 order-1 sm:order-2">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Checkbox
                id="autoEmail"
                checked={autoEmail}
                onCheckedChange={(checked) => {
                  const value = !!checked;
                  setAutoEmail(value);
                  setFormData((prev) => ({ ...prev, checkEmail: value }));
                }}
              />
              <label
                htmlFor="autoEmail"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Send Email Notifications to Customer
              </label>
            </div>
            {currentStep === 4 ? (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 rounded-lg transition-colors ${
                  isLoading
                    ? "bg-zinc-400 text-zinc-200 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">
                      {isEditing
                        ? "Updating shipment..."
                        : formData.checkEmail
                        ? "Creating shipment, generating PDF & sending email..."
                        : "Creating shipment & generating PDF..."}
                    </span>
                    <span className="sm:hidden">
                      {isEditing ? "Updating..." : "Creating..."}
                    </span>
                  </>
                ) : (
                  <>
                    <Package className="w-4 h-4" />
                    <span>
                      {isEditing ? "Update Shipment" : "Create Shipment"}
                    </span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentForm;
