import React, { useState } from "react";
import {
  Package,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  ChevronLeft,
  Save,
} from "lucide-react";

interface ShipmentData {
  // Step 1
  shipmentType: string;
  deliveryPriority: string;
  pickupDate: string;
  deliveryDate: string;

  // Step 2
  originCompany: string;
  originContact: string;
  originAddress1: string;
  originAddress2: string;
  originCity: string;
  originState: string;
  originZip: string;
  originPhone: string;
  originEmail: string;

  destCompany: string;
  destContact: string;
  destAddress1: string;
  destAddress2: string;
  destCity: string;
  destState: string;
  destZip: string;
  destPhone: string;
  destEmail: string;

  // Step 3
  items: Array<{
    description: string;
    category: string;
    quantity: number;
    weight: number;
    value: number;
    hazardous: boolean;
  }>;
  currency: { code: string; symbol: string; name: string };

  // Step 4
  insuranceCoverage: boolean;
  signatureRequired: boolean;
  temperatureControlled: boolean;
  fragileHandling: boolean;
  preferredCarrier: string;
  serviceLevel: string;
  specialInstructions: string;
}
import { currencies } from "../assets/data/api";

interface ShipmentFormProps {
  initialData?: ShipmentData;
  onSubmit?: (data: ShipmentData) => void;
}

const ShipmentForm: React.FC<ShipmentFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<ShipmentData>(
    initialData || {
      shipmentType: "Standard Package",
      deliveryPriority: "Standard",
      pickupDate: "",
      deliveryDate: "",
      originCompany: "",
      originContact: "",
      originAddress1: "",
      originAddress2: "",
      originCity: "",
      originState: "",
      originZip: "",
      originPhone: "",
      originEmail: "",
      destCompany: "",
      destContact: "",
      destAddress1: "",
      destAddress2: "",
      destCity: "",
      destState: "",
      destZip: "",
      destPhone: "",
      destEmail: "",
      items: [
        {
          description: "",
          category: "General Merchandise",
          quantity: 1,
          weight: 0,
          value: 0,
          hazardous: false,
        },
      ],
      currency: { code: "USD", symbol: "$", name: "US Dollar" },
      insuranceCoverage: false,
      signatureRequired: false,
      temperatureControlled: false,
      fragileHandling: false,
      preferredCarrier: "",
      serviceLevel: "",
      specialInstructions: "",
    }
  );

  const steps = [
    { id: 1, name: "Shipment Type", icon: Package },
    { id: 2, name: "Addresses", icon: MapPin },
    { id: 3, name: "Package Details", icon: Package },
    { id: 4, name: "Services", icon: FileText },
    { id: 5, name: "Review", icon: CreditCard },
  ];

  const getCompletionPercentage = () => {
    return (currentStep / 5) * 100;
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: keyof ShipmentData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, items: updatedItems }));
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
          hazardous: false,
        },
      ],
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Package className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">
          Shipment Type & Priority
        </h2>
      </div>
      <p className="text-zinc`-400 text-sm mb-6">
        Select the type of shipment and delivery priority
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-yellow-400 text-sm font-medium mb-3">
            Shipment Type
          </h3>
          <div className="space-y-2">
            {[
              "Standard Package",
              "Document Envelope",
              "Pallet/Freight",
              "Bulk Cargo",
            ].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="shipmentType"
                  value={type}
                  checked={formData.shipmentType === type}
                  onChange={(e) =>
                    handleInputChange("shipmentType", e.target.value)
                  }
                  className="mr-3 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-zinc`-300">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-yellow-400 text-sm font-medium mb-3">
            Delivery Priority
          </h3>
          <div className="space-y-2">
            {[
              { name: "Standard", days: "7-10 business days", price: "$15.99" },
              { name: "Express", days: "2-3 business days", price: "$39.99" },
              { name: "Overnight", days: "Next business day", price: "$69.99" },
            ].map((option) => (
              <label
                key={option.name}
                className="flex items-center justify-between p-3 border border-zinc`-600 rounded-lg hover:border-zinc`-500 cursor-pointer"
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryPriority"
                    value={option.name}
                    checked={formData.deliveryPriority === option.name}
                    onChange={(e) =>
                      handleInputChange("deliveryPriority", e.target.value)
                    }
                    className="mr-3 text-blue-500 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-white font-medium">
                      {option.name}
                    </span>
                    <p className="text-zinc`-400 text-sm">{option.days}</p>
                  </div>
                </div>
                <span className="text-white font-semibold">{option.price}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Pickup Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) =>
                  handleInputChange("pickupDate", e.target.value)
                }
                className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
                placeholder="Select pickup date"
              />
              <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-zinc`-400" />
            </div>
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Preferred Delivery Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.deliveryDate}
                onChange={(e) =>
                  handleInputChange("deliveryDate", e.target.value)
                }
                className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
                placeholder="Select delivery date"
              />
              <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-zinc`-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Origin Address</h2>
      </div>
      <p className="text-zinc`-400 text-sm mb-6">
        Enter the pickup location details
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={formData.originCompany}
              onChange={(e) =>
                handleInputChange("originCompany", e.target.value)
              }
              className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter company name"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Contact Name
            </label>
            <input
              type="text"
              value={formData.originContact}
              onChange={(e) =>
                handleInputChange("originContact", e.target.value)
              }
              className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter contact name"
            />
          </div>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Address Line 1
          </label>
          <input
            type="text"
            value={formData.originAddress1}
            onChange={(e) =>
              handleInputChange("originAddress1", e.target.value)
            }
            className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
            placeholder="Enter street address"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Address Line 2 <span className="text-zinc`-500">(Optional)</span>
          </label>
          <input
            type="text"
            value={formData.originAddress2}
            onChange={(e) =>
              handleInputChange("originAddress2", e.target.value)
            }
            className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
            placeholder="Apartment, suite, etc."
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              City
            </label>
            <input
              type="text"
              value={formData.originCity}
              onChange={(e) => handleInputChange("originCity", e.target.value)}
              className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter city"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              State/Province
            </label>
            <select
              value={formData.originState}
              onChange={(e) => handleInputChange("originState", e.target.value)}
              className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Select state</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
            </select>
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              ZIP/Postal Code
            </label>
            <input
              type="text"
              value={formData.originZip}
              onChange={(e) => handleInputChange("originZip", e.target.value)}
              className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter ZIP code"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.originPhone}
              onChange={(e) => handleInputChange("originPhone", e.target.value)}
              className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.originEmail}
              onChange={(e) => handleInputChange("originEmail", e.target.value)}
              className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter email address"
            />
          </div>
        </div>
      </div>

      {/* Destination Address */}
      <div className="mt-8 pt-6 border-t border-zinc`-700">
        <div className="flex items-center space-x-2 mb-6">
          <MapPin className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">
            Destination Address
          </h2>
        </div>
        <p className="text-zinc`-400 text-sm mb-6">
          Enter the delivery location details
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formData.destCompany}
                onChange={(e) =>
                  handleInputChange("destCompany", e.target.value)
                }
                className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Contact Name
              </label>
              <input
                type="text"
                value={formData.destContact}
                onChange={(e) =>
                  handleInputChange("destContact", e.target.value)
                }
                className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter contact name"
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Address Line 1
            </label>
            <input
              type="text"
              value={formData.destAddress1}
              onChange={(e) =>
                handleInputChange("destAddress1", e.target.value)
              }
              className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter street address"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Address Line 2 <span className="text-zinc`-500">(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.destAddress2}
              onChange={(e) =>
                handleInputChange("destAddress2", e.target.value)
              }
              className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
              placeholder="Apartment, suite, etc."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.destCity}
                onChange={(e) => handleInputChange("destCity", e.target.value)}
                className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter city"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                State/Province
              </label>
              <select
                value={formData.destState}
                onChange={(e) => handleInputChange("destState", e.target.value)}
                className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Select state</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                value={formData.destZip}
                onChange={(e) => handleInputChange("destZip", e.target.value)}
                className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter ZIP code"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.destPhone}
                onChange={(e) => handleInputChange("destPhone", e.target.value)}
                className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.destEmail}
                onChange={(e) => handleInputChange("destEmail", e.target.value)}
                className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
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
        <Package className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Package Details</h2>
      </div>
      <p className="text-zinc`-400 text-sm mb-6">Add items to your shipment</p>

      <div className="space-y-6">
        {formData.items.map((item, index) => (
          <div key={index} className="border border-zinc`-600 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Item {index + 1}</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter item description"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={item.category}
                  onChange={(e) =>
                    handleItemChange(index, "category", e.target.value)
                  }
                  className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="General Merchandise">
                    General Merchandise
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
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
                  className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
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
                  className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Value ({formData.currency.symbol})
                </label>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) =>
                    handleItemChange(index, "value", parseFloat(e.target.value))
                  }
                  className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white placeholder-zinc`-400 focus:outline-none focus:border-blue-500"
                  step="0.01"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.hazardous}
                  onChange={(e) =>
                    handleItemChange(index, "hazardous", e.target.checked)
                  }
                  className="mr-3 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-zinc`-300">Hazardous</span>
              </label>
            </div>
          </div>
        ))}

        {/* Currency Selector */}
        <div className="border border-zinc`-600 rounded-lg p-4">
          <h3 className="text-white font-medium mb-4">Currency</h3>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Select Currency
            </label>
            <select
              value={formData.currency.code}
              onChange={(e) => {
                const selectedCurrency = currencies.find(
                  (c) => c.code === e.target.value
                );
                if (selectedCurrency) {
                  handleInputChange("currency", selectedCurrency);
                }
              }}
              className="w-full bg-zinc`-800 border border-zinc`-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
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
          className="w-full border border-dashed border-zinc`-600 rounded-lg py-3 text-blue-400 hover:border-blue-500 hover:text-blue-300 transition-colors"
        >
          + Add Another Item
        </button>

        {/* Summary */}
        <div className="bg-zinc`-800 rounded-lg p-4 mt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">
                {formData.items.length}
              </div>
              <div className="text-zinc`-400 text-sm">Total Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {formData.items
                  .reduce((sum, item) => sum + item.weight, 0)
                  .toFixed(1)}{" "}
                lbs
              </div>
              <div className="text-zinc`-400 text-sm">Total Weight</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {formData.currency.symbol}
                {formData.items
                  .reduce((sum, item) => sum + item.value, 0)
                  .toFixed(2)}
              </div>
              <div className="text-zinc`-400 text-sm">Total Value</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5 text-zinc-400 dark:text-zinc-300" />
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Special Services & Options
        </h2>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">
        Configure additional services for your shipment
      </p>

      <div className="space-y-6">
        <div className="space-y-4">
          {[
            {
              label: "Insurance Coverage",
              desc: "Protect your shipment against loss or damage",
              key: "insuranceCoverage",
            },
            {
              label: "Signature Required",
              desc: "Require signature upon delivery",
              key: "signatureRequired",
            },
            {
              label: "Temperature Controlled",
              desc: "Maintain specific temperature range",
              key: "temperatureControlled",
            },
            {
              label: "Fragile Handling",
              desc: "Special care for delicate items",
              key: "fragileHandling",
            },
          ].map(({ label, desc, key }) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg"
            >
              <div>
                <h3 className="text-zinc-900 dark:text-zinc-100 font-medium">
                  {label}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  {desc}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData[key]}
                  onChange={(e) => handleInputChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-300 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-zinc-100 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-100 dark:after:bg-zinc-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-900 dark:text-zinc-100 text-sm font-medium mb-2">
              Preferred Carrier
            </label>
            <select
              value={formData.preferredCarrier}
              onChange={(e) =>
                handleInputChange("preferredCarrier", e.target.value)
              }
              className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select carrier</option>
              <option value="FedEx">FedEx</option>
              <option value="UPS">UPS</option>
              <option value="DHL">DHL</option>
              <option value="USPS">USPS</option>
            </select>
          </div>
          <div>
            <label className="block text-zinc-900 dark:text-zinc-100 text-sm font-medium mb-2">
              Service Level
            </label>
            <select
              value={formData.serviceLevel}
              onChange={(e) =>
                handleInputChange("serviceLevel", e.target.value)
              }
              className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select service</option>
              <option value="Ground">Ground</option>
              <option value="Express">Express</option>
              <option value="Overnight">Overnight</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-zinc-900 dark:text-zinc-100 text-sm font-medium mb-2">
            Special Instructions
          </label>
          <textarea
            value={formData.specialInstructions}
            onChange={(e) =>
              handleInputChange("specialInstructions", e.target.value)
            }
            rows={4}
            className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            placeholder="Enter any special handling instructions, delivery notes, or requirements..."
          />
        </div>

        <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-600/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
            <p className="text-blue-600 dark:text-blue-300 text-sm">
              Additional services may affect shipping cost and delivery time.
              Review the cost estimate in the next step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => {
    const totalWeight = formData.items.reduce(
      (sum, item) => sum + item.weight,
      0
    );
    const totalValue = formData.items.reduce(
      (sum, item) => sum + item.value,
      0
    );
    const baseShipping = 15.0;
    const weightCharge = totalWeight * 2.5;
    const totalCost = baseShipping + weightCharge;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">
            Review & Cost Estimate
          </h2>
        </div>
        <p className="text-zinc`-400 text-sm mb-6">
          Review your shipment details and get a cost estimate
        </p>

        <div className="grid grid-cols-2 gap-6">
          {/* Shipment Summary */}
          <div className="space-y-4">
            <h3 className="text-yellow-400 text-lg font-medium">
              Shipment Summary
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc`-400">Type:</span>
                <span className="text-white">{formData.shipmentType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc`-400">Priority:</span>
                <span className="text-white">{formData.deliveryPriority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc`-400">Pickup Date:</span>
                <span className="text-white">
                  {formData.pickupDate || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc`-400">Delivery Date:</span>
                <span className="text-white">
                  {formData.deliveryDate || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc`-400">Total Items:</span>
                <span className="text-white">{formData.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc`-400">Total Weight:</span>
                <span className="text-white">{totalWeight.toFixed(1)} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc`-400">Total Value:</span>
                <span className="text-white">
                  {formData.currency.symbol}
                  {totalValue.toFixed(2)} {formData.currency.code}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc`-700">
              <h4 className="text-white font-medium mb-2">Route</h4>
              <div className="space-y-1">
                <div>
                  <span className="text-zinc`-400 text-sm">From:</span>
                  <p className="text-white">
                    {formData.originCompany || "Origin Company"}
                  </p>
                </div>
                <div>
                  <span className="text-zinc`-400 text-sm">To:</span>
                  <p className="text-white">
                    {formData.destCompany || "Destination Company"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc`-700">
              <h4 className="text-white font-medium mb-2">Special Services</h4>
              <p className="text-zinc`-400 text-sm">
                {[
                  formData.insuranceCoverage && "Insurance Coverage",
                  formData.signatureRequired && "Signature Required",
                  formData.temperatureControlled && "Temperature Controlled",
                  formData.fragileHandling && "Fragile Handling",
                ]
                  .filter(Boolean)
                  .join(", ") || "No special services selected"}
              </p>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-4">
            <h3 className="text-yellow-400 text-lg font-medium">
              Cost Breakdown
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc`-400">Base Shipping:</span>
                <span className="text-white">${baseShipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc`-400">Weight Charges:</span>
                <span className="text-white">${weightCharge.toFixed(2)}</span>
              </div>
              <div className="border-t border-zinc`-600 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-white">Total Estimated Cost:</span>
                  <span className="text-white">${totalCost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              Recalculate Estimate
            </button>

            <div className="bg-zinc`-800 rounded-lg p-4 mt-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full border-2 border-yellow-400 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                </div>
                <p className="text-zinc`-300 text-sm">
                  This is an estimate. Final cost may vary based on actual
                  dimensions and carrier rates.
                </p>
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
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Create New Shipment
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Follow the steps below to create and schedule your shipment
          </p>
        </div>

        {/* Progress Section */}
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-6 mb-8 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="text-zinc-900 dark:text-zinc-100">
              <span className="text-sm">Step {currentStep} of 5</span>
            </div>
            <div className="text-right">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {getCompletionPercentage()}% Complete
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 mb-6">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${getCompletionPercentage()}%` }}
            ></div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {currentStep > step.id ? "✓" : step.id}
                </div>
                <span
                  className={`mt-2 text-xs ${
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

        {/* Step Content */}
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-8 mb-8 transition-colors">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
              currentStep === 1
                ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                : "bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-600"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-6 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
              <Save className="w-4 h-4" />
              <span>Save Draft</span>
            </button>

            {currentStep === 5 ? (
              <button
                onClick={() => onSubmit?.(formData)}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Package className="w-4 h-4" />
                <span>
                  {initialData ? "Update Shipment" : "Create Shipment"}
                </span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
