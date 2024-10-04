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
