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
