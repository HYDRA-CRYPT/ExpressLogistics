import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/api";
import axios, { AxiosError, type AxiosResponse } from "axios";

// Define BASE_URL for this store
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? "/api" : "http://localhost:5000/api");

type ShipmentStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "In Transit"
  | "On Hold"
  | "Delivered";

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationUpdate {
  _id?: string;
  description?: string;
  status?: ShipmentStatus | string;
  time?: string | number | Date;
  updateDate?: string;
  updateTime?: string;
  location?: string; // Address/city string
  coordinates?: Coordinates; // Lat/lng object
  city?: string;
  country?: string;
  state?: string;
  date?: string;
  [key: string]: unknown;
}

interface Party {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  coordinates?: Coordinates;
  date?: string;
  [key: string]: unknown;
}

interface ShipmentItem {
  description?: string;
  quantity?: number;
  weight?: number;
  value?: number;
  [key: string]: unknown;
}

interface TimelineItem {
  id?: string;
  status?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  [key: string]: unknown;
}

interface ShipmentData {
  _id?: string;
  trackingCode?: string;
  trackingNumber?: string;
  sender?: Party;
  receiver?: Party;
  // Added for MapView compatibility
  origin?: Party;
  destination?: Party;
  shipmentType?: string;
  shipmentTypeDisplay?: string;
  items?: ShipmentItem[];
  deliveryFee?: number;
  currency?: string;
  status?: ShipmentStatus | string;
  history?: LocationUpdate[];
  dateSent?: string | number | Date;
  deliveryDate?: string | number | Date;
  checkEmail?: boolean;
  invoiceUrl?: string;
  updatedAt?: string | number | Date;

  // Added route coordinates for MapView
  routeCoordinates?: Array<{
    lat: number;
    lng: number;
    city?: string;
    country?: string;
    description?: string;
    date?: string;
  }>;

  // Optional UI/derived fields
  trackingNumberDisplay?: string;
  type?: string;
  packageCount?: number;
  estimatedDelivery?: string;
  currentLocation?: string;
  lastUpdated?: string;
  progressPercentage?: number;
  timeline?: TimelineItem[];

  [key: string]: unknown;
}

interface ApiErrorDetails {
  field?: string;
  code?: string;
  message?: string;
  [key: string]: unknown;
}

interface ApiError {
  message: string;
  code?: string | number;
  details?: ApiErrorDetails | string | null;
}

interface UpdatePayload {
  status?: ShipmentStatus | string;
  location?: {
    lat?: number;
    lng?: number;
    description?: string;
    city?: string;
    country?: string;
  };
  description?: string;
  estimatedDelivery?: string | Date;
  [key: string]: unknown;
}

interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status?: string;
  [key: string]: unknown;
}

interface DeliveryStoreState {
  shipment: ShipmentData | null;
  isLoading: boolean;
  error: ApiError | null;
  lastFetchedTrackingCode: string | null;
  fetchShipment: (trackingCode: string) => Promise<void>;
  updateStatusAndLocation: (
    deliveryId: string,
    payload: UpdatePayload
  ) => Promise<void>;
  clearError: () => void;
  clearShipment: () => void;
  retry: () => Promise<void>;
}

// Create axios instance with consistent configuration
const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000, // Increased to 60 seconds for delivery operations
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add response interceptor for consistent error handling
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      console.error("Axios interceptor caught error:", error);

      if (error.code === "ECONNABORTED") {
        throw new Error("Request timeout - please check your connection");
      }
      if (!error.response) {
        throw new Error(
          "Network error - please check your internet connection"
        );
      }
      throw error;
    }
  );

  return instance;
};

// Type guard functions
const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === "object";
};

// Enhanced validation functions
const validateTrackingCode = (trackingCode: string): boolean => {
  return isString(trackingCode) && trackingCode.trim().length > 0;
};

const validateDeliveryId = (deliveryId: string): boolean => {
  return isString(deliveryId) && deliveryId.trim().length > 0;
};

const validateShipmentData = (data: unknown): data is ShipmentData => {
  console.log("DeliveryStore: Validating shipment data:", data);

  if (!isObject(data)) {
    console.warn("Invalid shipment data: not an object", data);
    return false;
  }

  const shipmentData = data as Record<string, unknown>;
  const hasId =
    typeof shipmentData._id === "string" && shipmentData._id.length > 0;
  const hasTrackingCode =
    typeof shipmentData.trackingCode === "string" &&
    shipmentData.trackingCode.length > 0;
  const hasTrackingNumber =
    typeof shipmentData.trackingNumber === "string" &&
    shipmentData.trackingNumber.length > 0;

  console.log("DeliveryStore: Validation checks:", {
    hasId,
    hasTrackingCode,
    hasTrackingNumber,
    _id: shipmentData._id,
    trackingCode: shipmentData.trackingCode,
    trackingNumber: shipmentData.trackingNumber,
  });

  const isValid = hasId || hasTrackingCode || hasTrackingNumber;

  if (!isValid) {
    console.warn("Invalid shipment data: missing required identifiers", {
      hasId,
      hasTrackingCode,
      hasTrackingNumber,
      data: shipmentData,
    });
  } else {
    console.log("DeliveryStore: Shipment data validation passed");
  }

  return isValid;
};

const validateUpdatePayload = (payload: unknown): payload is UpdatePayload => {
  return isObject(payload);
};

// Type guard for ApiErrorDetails
const isApiErrorDetails = (value: unknown): value is ApiErrorDetails => {
  return (
    isObject(value) &&
    (typeof (value as Record<string, unknown>).field === "string" ||
      typeof (value as Record<string, unknown>).code === "string" ||
      typeof (value as Record<string, unknown>).message === "string")
  );
};

// Enhanced data normalization
const normalizeShipmentData = (rawData: unknown): ShipmentData => {
  if (!isObject(rawData)) {
    console.warn("Cannot normalize non-object shipment data:", rawData);
    return {} as ShipmentData;
  }

  const data = rawData as Record<string, unknown>;
  console.log("Normalizing shipment data:", data);

  const senderObj = isObject(data.sender)
    ? (data.sender as Record<string, unknown>)
    : undefined;
  const receiverObj = isObject(data.receiver)
    ? (data.receiver as Record<string, unknown>)
    : undefined;

  const normalizedSender: Party | undefined = senderObj
    ? {
        ...(senderObj as Party),
        coordinates: normalizeCoordinates(senderObj.coordinates),
      }
    : undefined;

  const normalizedReceiver: Party | undefined = receiverObj
    ? {
        ...(receiverObj as Party),
        coordinates: normalizeCoordinates(receiverObj.coordinates),
      }
    : undefined;

  const normalized: ShipmentData = {
    _id: typeof data._id === "string" ? (data._id as string) : undefined,
    trackingCode:
      typeof data.trackingCode === "string"
        ? (data.trackingCode as string)
        : undefined,
    trackingNumber:
      typeof data.trackingNumber === "string"
        ? (data.trackingNumber as string)
        : undefined,
    sender: normalizedSender,
    receiver: normalizedReceiver,
    // Ensure origin/destination exist for MapView compatibility
    origin: isObject(data.origin) ? (data.origin as Party) : normalizedSender,
    destination: isObject(data.destination)
      ? (data.destination as Party)
      : normalizedReceiver,
    shipmentType:
      typeof data.shipmentType === "string"
        ? (data.shipmentType as string)
        : undefined,
    shipmentTypeDisplay:
      typeof data.shipmentTypeDisplay === "string"
        ? (data.shipmentTypeDisplay as string)
        : undefined,
    items: Array.isArray(data.items)
      ? (data.items as ShipmentItem[])
      : undefined,
    deliveryFee:
      typeof data.deliveryFee === "number"
        ? (data.deliveryFee as number)
        : undefined,
    currency:
      typeof data.currency === "string"
        ? (data.currency as string)
        : isObject(data.currency) &&
          typeof (data.currency as Record<string, unknown>).code === "string"
        ? ((data.currency as Record<string, unknown>).code as string)
        : undefined,
    status:
      typeof data.status === "string"
        ? (data.status as ShipmentStatus | string)
        : undefined,
    // Normalize history and routeCoordinates using helper functions
    history: normalizeHistory(data.history),
    dateSent: data.dateSent as ShipmentData["dateSent"],
    deliveryDate: data.deliveryDate as ShipmentData["deliveryDate"],
    routeCoordinates: normalizeRouteCoordinates(data.routeCoordinates),
    // keep any other fields present (safe spread)
    ...(() => {
      const extras: Record<string, unknown> = {};
      for (const k of Object.keys(data)) {
        if (
          [
            "_id",
            "trackingCode",
            "trackingNumber",
            "sender",
            "receiver",
            "origin",
            "destination",
            "shipmentType",
            "shipmentTypeDisplay",
            "items",
            "deliveryFee",
            "currency",
            "status",
            "history",
            "dateSent",
            "deliveryDate",
            "routeCoordinates",
          ].includes(k)
        )
          continue;
        extras[k] = data[k];
      }
      return extras;
    })(),
  };

  console.log("Normalized shipment data:", normalized);
  return normalized;
};

const normalizeCoordinates = (coords: unknown): Coordinates | undefined => {
  if (!isObject(coords)) return undefined;

  const coordsObj = coords as Record<string, unknown>;
  const lat =
    typeof coordsObj.lat === "number"
      ? coordsObj.lat
      : typeof coordsObj.latitude === "number"
      ? coordsObj.latitude
      : undefined;
  const lng =
    typeof coordsObj.lng === "number"
      ? coordsObj.lng
      : typeof coordsObj.lon === "number"
      ? coordsObj.lon
      : typeof coordsObj.longitude === "number"
      ? coordsObj.longitude
      : undefined;

  return lat !== undefined && lng !== undefined ? { lat, lng } : undefined;
};

const normalizeHistory = (history: unknown): LocationUpdate[] => {
  if (!Array.isArray(history)) {
    console.log("History is not an array:", history);
    return [];
  }

  return history.map((entry, index) => {
    if (!isObject(entry)) {
      console.warn(`History entry ${index} is not an object:`, entry);
      return {};
    }

    const entryObj = entry as Record<string, unknown>;
    return {
      ...entryObj,
      coordinates: normalizeCoordinates(entryObj.coordinates),
      // Ensure we have proper time/date fields
      time: entryObj.time || entryObj.date || entryObj.timestamp,
      date: entryObj.date || entryObj.time || entryObj.timestamp,
    };
  });
};

const normalizeRouteCoordinates = (
  routeCoords: unknown
): Array<{
  lat: number;
  lng: number;
  city?: string;
  country?: string;
  description?: string;
  date?: string;
}> => {
  if (!Array.isArray(routeCoords)) {
    console.log("Route coordinates is not an array:", routeCoords);
    return [];
  }

  return routeCoords
    .map((coord, index) => {
      if (!isObject(coord)) {
        console.warn(`Route coordinate ${index} is not an object:`, coord);
        return null;
      }

      const coordObj = coord as Record<string, unknown>;
      const normalizedCoords = normalizeCoordinates(coordObj);

      if (!normalizedCoords) {
        console.warn(`Route coordinate ${index} has invalid lat/lng:`, coord);
        return null;
      }

      return {
        lat: normalizedCoords.lat,
        lng: normalizedCoords.lng,
        city: typeof coordObj.city === "string" ? coordObj.city : undefined,
        country:
          typeof coordObj.country === "string" ? coordObj.country : undefined,
        description:
          typeof coordObj.description === "string"
            ? coordObj.description
            : undefined,
        date: typeof coordObj.date === "string" ? coordObj.date : undefined,
      };
    })
    .filter((coord): coord is NonNullable<typeof coord> => coord !== null);
};

// Enhanced error formatting utility
const formatError = (error: unknown): ApiError => {
  console.error("Formatting error:", error);

  // Handle AxiosError
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<ApiResponse<unknown>>;
    if (axiosError.response?.data && isObject(axiosError.response.data)) {
      const responseData = axiosError.response.data as Record<string, unknown>;

      let details: ApiErrorDetails | string | null = null;
      if (isApiErrorDetails(responseData.details)) {
        details = responseData.details;
      } else if (isString(responseData.details)) {
        details = responseData.details;
      } else if (Object.keys(responseData).length > 0) {
        details = {
          message: isString(responseData.error)
            ? responseData.error
            : undefined,
          code: isString(responseData.code) ? responseData.code : undefined,
          ...responseData,
        } as ApiErrorDetails;
      }

      return {
        message: isString(responseData.message)
          ? responseData.message
          : "Request failed",
        code: axiosError.response.status,
        details,
      };
    }
  }

  // Handle Error objects
  if (error instanceof Error) {
    return {
      message: error.message,
      code: "name" in error ? error.name : "UNKNOWN",
    };
  }

  // Handle string errors
  if (isString(error)) {
    return {
      message: error,
      code: "STRING_ERROR",
    };
  }

  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN",
  };
};

export const useDeliveryStore = create<DeliveryStoreState>()(
  devtools(
    (set, get) => {
      // Axios instance for this store
      const axiosInstance = createAxiosInstance();

      // Request cancellation
      let currentRequest: AbortController | null = null;

      return {
        shipment: null,
        isLoading: false,
        error: null,
        lastFetchedTrackingCode: null,

        fetchShipment: async (trackingCode: string) => {
          console.log(
            "DeliveryStore: fetchShipment called with:",
            trackingCode
          );

          // Input validation
          if (!validateTrackingCode(trackingCode)) {
            console.error(
              "DeliveryStore: Invalid tracking code provided:",
              trackingCode
            );
            set({
              error: {
                message: "Invalid tracking code provided",
                code: "VALIDATION_ERROR",
              },
            });
            return;
          }

          // Cancel previous request if still pending
          if (currentRequest) {
            console.log("DeliveryStore: Cancelling previous request");
            currentRequest.abort();
          }

          // Create new abort controller for this request
          currentRequest = new AbortController();

          set({
            isLoading: true,
            error: null,
            lastFetchedTrackingCode: trackingCode.trim(),
          });

          try {
            console.log(
              "DeliveryStore: Making API request for tracking code:",
              trackingCode.trim()
            );

            const response = await axiosInstance.get<ShipmentData>(
              `/deliveries/track/${encodeURIComponent(
                trackingCode.trim()
              )}/full`,
              { signal: currentRequest.signal }
            );

            console.log("DeliveryStore: Received API response:", response.data);
            console.log("DeliveryStore: Response status:", response.status);
            console.log(
              "DeliveryStore: Response data type:",
              typeof response.data
            );
            console.log(
              "DeliveryStore: Response data keys:",
              Object.keys(response.data || {})
            );

            // Validate and normalize response data
            if (!validateShipmentData(response.data)) {
              console.error(
                "DeliveryStore: Validation failed for response data:",
                response.data
              );
              throw new Error("Invalid shipment data received from server");
            }

            const normalizedShipment = normalizeShipmentData(response.data);
            console.log(
              "DeliveryStore: Normalized shipment data:",
              normalizedShipment
            );

            set({
              shipment: normalizedShipment,
              isLoading: false,
              error: null,
            });

            console.log("DeliveryStore: Shipment data successfully stored");
          } catch (error: unknown) {
            // Don't set error if request was cancelled
            if (
              error instanceof Error &&
              (error.name === "CanceledError" || error.name === "AbortError")
            ) {
              console.log("DeliveryStore: Request was cancelled");
              return;
            }

            console.error("DeliveryStore: Error fetching shipment:", error);
            const formattedError = formatError(error);
            set({
              error: formattedError,
              isLoading: false,
              shipment: null,
            });
          } finally {
            currentRequest = null;
          }
        },

        updateStatusAndLocation: async (
          deliveryId: string,
          payload: UpdatePayload
        ) => {
          console.log("DeliveryStore: updateStatusAndLocation called:", {
            deliveryId,
            payload,
          });

          // Input validation
          if (!validateDeliveryId(deliveryId)) {
            console.error(
              "DeliveryStore: Invalid delivery ID provided:",
              deliveryId
            );
            set({
              error: {
                message: "Invalid delivery ID provided",
                code: "VALIDATION_ERROR",
              },
            });
            return;
          }

          if (!validateUpdatePayload(payload)) {
            console.error("DeliveryStore: Invalid payload provided:", payload);
            set({
              error: {
                message: "Invalid payload provided for update",
                code: "VALIDATION_ERROR",
              },
            });
            return;
          }

          // Cancel any ongoing fetch requests
          if (currentRequest) {
            console.log("DeliveryStore: Cancelling ongoing request for update");
            currentRequest.abort();
          }

          set({ isLoading: true, error: null });

          try {
            console.log("DeliveryStore: Making update API request");

            // Use the api service for consistency
            const response = await api.put<ShipmentData>(
              `/deliveries/${encodeURIComponent(
                deliveryId.trim()
              )}/update-combined`,
              payload
            );

            console.log(
              "DeliveryStore: Received update response:",
              response.data
            );

            // Validate and normalize response data
            if (!validateShipmentData(response.data)) {
              throw new Error("Invalid shipment data received from update");
            }

            const normalizedShipment = normalizeShipmentData(response.data);
            console.log(
              "DeliveryStore: Normalized updated shipment data:",
              normalizedShipment
            );

            // Update the shipment in store with the new data
            set({
              shipment: normalizedShipment,
              isLoading: false,
              error: null,
            });

            console.log("DeliveryStore: Shipment update successful");
          } catch (error: unknown) {
            console.error("DeliveryStore: Error updating shipment:", error);
            const formattedError = formatError(error);
            set({
              error: formattedError,
              isLoading: false,
            });
          }
        },

        clearError: () => {
          console.log("DeliveryStore: Clearing error");
          set({ error: null });
        },

        clearShipment: () => {
          console.log("DeliveryStore: Clearing shipment data");

          // Cancel any pending requests
          if (currentRequest) {
            currentRequest.abort();
            currentRequest = null;
          }

          set({
            shipment: null,
            error: null,
            isLoading: false,
            lastFetchedTrackingCode: null,
          });
        },

        retry: async () => {
          const { lastFetchedTrackingCode } = get();
          console.log(
            "DeliveryStore: Retry called with last tracking code:",
            lastFetchedTrackingCode
          );

          if (lastFetchedTrackingCode) {
            await get().fetchShipment(lastFetchedTrackingCode);
          } else {
            console.warn("DeliveryStore: No previous tracking code to retry");
            set({
              error: {
                message: "No previous tracking code to retry",
                code: "NO_RETRY_DATA",
              },
            });
          }
        },
      };
    },
    {
      name: "delivery-store",
    }
  )
);
