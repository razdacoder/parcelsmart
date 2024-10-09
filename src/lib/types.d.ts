type Shipmnet = {
  date: Date;
  reciever: string;
  destination: string;
  shipmentId: string;
  source: string;
  sourceSvgUrl: string;
  price: number;
  status: "canceled" | "in-transit" | "completed" | "draft";
};

interface ErrorResponseType {
  status: boolean;
  message: string;
}

type Transaction = {
  date: Date;
  type: "inflow" | "outflow";
  description: string;
  reference: string;
  amount: number;
};

type Address = {
  date: Date;
  name: string;
  phoneNumber: string;
  email: string;
  location: string;
};

type AddressBook = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  line_1: string;
  line_2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  latitude: string;
  longitude: string;
  place_id: string;
  default: boolean;
  platform: string;
  platform_id: string;
  metadata?: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

type Pagination = {
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  next_page: number | null;
  previous_page: number | null;
  total_pages: number;
  has_previous_page: boolean;
  has_next_page: boolean;
};

type RegsiterUserData = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  username: string;
  confirm_password: string;
  account_type: string;
};

type RegisterSuccessType = {
  status: boolean;
  message: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    username: string;
    account_type: string;
    referral_source: string | null;
    active: boolean;
    referral_code: string;
    id: string;
    updated_at: Date;
    created_at: Date;
  };
};

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  username: string;
  account_type: "personal" | "platform";
  email_verified_at: Date;
  referral_source: null;
  referral_code: string;
  referred_by: null;
  profile_picture: string | null;
  bio: string | null;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

type AuthSuccessType = {
  status: boolean;
  message: string;
  data: {
    user: User;
    access_token: string;
    refresh_token: string;
    expires_at: Date;
    token_type: string;
  };
};

type StepsProps = {
  next: () => void;
  prev?: () => void;
};

type Optiontype = {
  label: string;
  value: string;
};

type Packaging = {
  height: string;
  length: string;
  name: string;
  size_unit: string;
  type: string;
  weight: string;
  weight_unit: string;
  width: string;
  packaging_id: string;
};

type Item = {
  id: string;
  parcel_id: string;
  name: string;
  description: string;
  currency: string;
  quantity: number;
  value: number;
  weight: number;
  hs_code: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

type Parcel = {
  id: string;
  user_id: string;
  description: string;
  packaging_id: string;
  weight_unit: string;
  proof_of_payments: string[];
  platform: string;
  platform_id: string;
  metadata: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  items: Item[];
};

type ShipmentRate = {
  platform_id: string;
  platform: string;
  amount: number;
  platform_amount: number;
  currency: string;
  carrier_name: string;
  carrier_logo: string;
  carrier_slug: string;
  carrier_reference: string;
  estimated_delivery_date: Date;
  estimated_delivery_eta: string;
  estimated_delivery_time: string;
  estimated_pickup_eta: string;
  estimated_pickup_time: string;
  dropoff_available: boolean;
  dropoff_only: boolean;
  dropoff_required: boolean;
  origin_address: AddressBook;
  destination_address: AddressBook;
  return_address: AddressBook;
  parcel: {
    id: string;
    total_weight: number;
    parcel_items: Item[];
  };
  user_id: string;
  id: string;
  updated_at: Date;
  created_at: Date;
};
