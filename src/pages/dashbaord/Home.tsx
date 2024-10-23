import bannerImage from "@/assets/banner.png";
import AppNavBar from "@/components/app-navbar";
import useMe from "@/features/auth/api/useMe";
import RecentShipment from "@/features/shipment/components/recent-shipment";
import ShipmentMetrics from "@/features/shipment/components/shipment-metrics";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const { data: user } = useMe();
  // const { data, isLoading: walletLoading } = useWallet();
  // const { onOpen } = useTopUpModal();

  return (
    <div className="flex flex-col gap-4 w-full overflow-hidden">
      <AppNavBar title="Overview" />
      <main className="px-4 md:px-8 space-y-6">
        <h3 className="text-xl font-bold text-text">
          Hi, {user?.data.first_name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          {/* <div className="w-full md:col-span-6 lg:col-span-5 p-4 bg-[#0B2230] rounded-xl text-white flex items-center justify-between">
            <div className="space-y-1.5">
              <h6 className="text-sm">Wallet Balance</h6>
              {walletLoading && (
                <div className="w-full">
                  <Skeleton className="h-8 w-full bg-gray-600" />
                </div>
              )}
              {data && (
                <h1 className="text-xl lg:text-[28px] leading-9 font-bold">
                  {formatNaira(parseFloat(data?.data[0].balance))}
                </h1>
              )}
            </div>
            <Button
              onClick={() => data && onOpen(data.data[0].id)}
              className="items-center gap-2 rounded-lg"
            >
              Top up <ArrowRight className="size-4" />
            </Button>
          </div> */}
          <div className="col-span-12 rounded-lg">
            <img
              src={bannerImage}
              alt="Referal Banner"
              className="w-full rounded-lg h-[140px] object-cover"
            />
          </div>
        </div>

        <ShipmentMetrics />

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-text">Quick Actions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link
              to="/shipment/new"
              className="bg-white rounded-xl text-text p-4 flex items-start justify-between"
            >
              <div className="space-y-8">
                <svg
                  width="77"
                  height="67"
                  viewBox="0 0 77 67"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.3333 48.3333C26.3333 49.7478 26.8952 51.1044 27.8953 52.1046C28.8955 53.1048 30.2521 53.6667 31.6666 53.6667C33.0811 53.6667 34.4376 53.1048 35.4378 52.1046C36.438 51.1044 36.9999 49.7478 36.9999 48.3333C36.9999 46.9188 36.438 45.5623 35.4378 44.5621C34.4376 43.5619 33.0811 43 31.6666 43C30.2521 43 28.8955 43.5619 27.8953 44.5621C26.8952 45.5623 26.3333 46.9188 26.3333 48.3333ZM52.9999 48.3333C52.9999 49.7478 53.5618 51.1044 54.562 52.1046C55.5622 53.1048 56.9188 53.6667 58.3333 53.6667C59.7477 53.6667 61.1043 53.1048 62.1045 52.1046C63.1047 51.1044 63.6666 49.7478 63.6666 48.3333C63.6666 46.9188 63.1047 45.5623 62.1045 44.5621C61.1043 43.5619 59.7477 43 58.3333 43C56.9188 43 55.5622 43.5619 54.562 44.5621C53.5618 45.5623 52.9999 46.9188 52.9999 48.3333Z"
                    stroke="#157C7B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26.3333 48.3335H20.9999V37.6668M18.3333 16.3335H47.6666V48.3335M36.9999 48.3335H52.9999M63.6666 48.3335H68.9999V32.3335M68.9999 32.3335H47.6666M68.9999 32.3335L60.9999 19.0002H47.6666M20.9999 27.0002H31.6666"
                    stroke="#157C7B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="inlibe-block text-lg font-semibold text-[#64748B]">
                  Book Shipment
                </span>
              </div>
              <ArrowUpRight className="size-5 text-primary" />
            </Link>
            <Link
              to="/get-qoute"
              className="bg-white rounded-xl text-text p-4 flex items-start justify-between"
            >
              <div className="space-y-8">
                <svg
                  width="81"
                  height="82"
                  viewBox="0 0 81 82"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M48.5893 50.6667H51.2559V48H55.2559C55.6364 48 55.9537 47.8729 56.2079 47.6187C56.4621 47.3644 56.5893 47.0471 56.5893 46.6667V38.6667C56.5893 38.288 56.4621 37.9707 56.2079 37.7147C55.9537 37.4604 55.6364 37.3333 55.2559 37.3333H45.9226V32H56.5893V29.3333H51.2559V26.6667H48.5893V29.3333H44.5893C44.2106 29.3333 43.8941 29.4604 43.6399 29.7147C43.3857 29.9689 43.2577 30.2862 43.2559 30.6667V38.6667C43.2559 39.0471 43.3839 39.3644 43.6399 39.6187C43.8959 39.8729 44.2124 40 44.5893 40H53.9226V45.3333H43.2559V48H48.5893V50.6667ZM34.6426 58C33.4141 58 32.3893 57.5893 31.5679 56.768C30.7466 55.9467 30.335 54.9218 30.3333 53.6933V14.3067C30.3333 13.08 30.7448 12.056 31.5679 11.2347C32.391 10.4133 33.4159 10.0018 34.6426 10H55.6666L67.6666 22V53.6933C67.6666 54.92 67.2559 55.9449 66.4346 56.768C65.6133 57.5911 64.5875 58.0018 63.3573 58H34.6426ZM54.3333 22.72V12.6667H34.6426C34.2319 12.6667 33.855 12.8373 33.5119 13.1787C33.1688 13.52 32.9981 13.896 32.9999 14.3067V53.6933C32.9999 54.1022 33.1706 54.4782 33.5119 54.8213C33.8533 55.1644 34.2293 55.3351 34.6399 55.3333H63.3599C63.7688 55.3333 64.1448 55.1627 64.4879 54.8213C64.831 54.48 65.0017 54.1031 64.9999 53.6907V22.72H54.3333Z"
                    fill="#157C7B"
                  />
                </svg>

                <span className="inlibe-block text-lg font-semibold text-[#64748B]">
                  Get Quote
                </span>
              </div>
              <ArrowUpRight className="size-5 text-primary" />
            </Link>
            <Link
              to="/track"
              className="bg-white rounded-xl text-text p-4 flex items-start justify-between"
            >
              <div className="space-y-8">
                <svg
                  width="77"
                  height="67"
                  viewBox="0 0 77 67"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40 28C40 30.1217 39.1571 32.1566 37.6569 33.6569C36.1566 35.1571 34.1217 36 32 36C29.8783 36 27.8434 35.1571 26.3431 33.6569C24.8429 32.1566 24 30.1217 24 28C24 25.8783 24.8429 23.8434 26.3431 22.3431C27.8434 20.8429 29.8783 20 32 20C34.1217 20 36.1566 20.8429 37.6569 22.3431C39.1571 23.8434 40 25.8783 40 28Z"
                    stroke="#157C7B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M52 28C52 47.0453 32 58 32 58C32 58 12 47.0453 12 28C12 22.6957 14.1071 17.6086 17.8579 13.8579C21.6086 10.1071 26.6957 8 32 8C37.3043 8 42.3914 10.1071 46.1421 13.8579C49.8929 17.6086 52 22.6957 52 28Z"
                    stroke="#157C7B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="inlibe-block text-lg font-semibold text-[#64748B]">
                  Track Shipment
                </span>
              </div>
              <ArrowUpRight className="size-5 text-primary" />
            </Link>
            <Link
              to="#"
              className="bg-white rounded-xl text-text p-4 flex items-start justify-between"
            >
              <div className="space-y-8">
                <svg
                  width="77"
                  height="67"
                  viewBox="0 0 77 67"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M43 48.4002C41.391 48.4005 39.8409 47.7948 38.6585 46.7037C37.476 45.6125 36.7479 44.116 36.6192 42.5122C32.351 41.0014 28.7537 38.0313 26.4624 34.1262C24.1712 30.221 23.3332 25.632 24.0964 21.169C24.8596 16.7061 27.1749 12.6563 30.6337 9.73454C34.0925 6.81273 38.4723 5.20679 43 5.2002C47.8156 5.1995 52.4557 7.00847 56.0002 10.2684C59.5447 13.5284 61.7347 18.0013 62.136 22.8002C62.1493 23.0084 62.1193 23.217 62.0477 23.4129C61.9761 23.6088 61.8645 23.7877 61.72 23.9382C61.5756 24.0886 61.4014 24.2074 61.2086 24.287C61.0158 24.3665 60.8085 24.4051 60.6 24.4002C60.1713 24.3895 59.762 24.2197 59.4515 23.924C59.1411 23.6283 58.9516 23.2278 58.92 22.8002C58.635 19.9709 57.6011 17.2686 55.9247 14.9716C54.2484 12.6746 51.9901 10.8659 49.3825 9.73167C46.7748 8.59743 43.912 8.17864 41.0887 8.51842C38.2655 8.8582 35.5837 9.94427 33.3197 11.6648C31.0556 13.3854 29.291 15.6783 28.2075 18.3074C27.124 20.9365 26.7608 23.8069 27.1552 26.6231C27.5496 29.4392 28.6875 32.0994 30.4516 34.3297C32.2157 36.56 34.5423 38.2799 37.192 39.3122C37.6741 38.2704 38.4275 37.3775 39.3733 36.727C40.3191 36.0765 41.4225 35.6924 42.5678 35.6148C43.713 35.5373 44.8581 35.7692 45.883 36.2862C46.9078 36.8033 47.7747 37.5865 48.3929 38.5538C49.0111 39.521 49.3577 40.6367 49.3965 41.784C49.4353 42.9312 49.1648 44.0678 48.6133 45.0746C48.0619 46.0814 47.2499 46.9213 46.2623 47.5064C45.2747 48.0915 44.1479 48.4002 43 48.4002ZM27.0288 40.4002H27.32C28.568 41.6194 29.9536 42.6946 31.4544 43.6002H27.0288C25.2336 43.6002 23.8 45.0306 23.8 46.8002C23.8 50.989 25.7904 54.109 29.1536 56.2498C32.5776 58.4354 37.448 59.6002 43 59.6002C48.552 59.6002 53.4224 58.4354 56.8464 56.2498C60.2064 54.1058 62.2 50.9922 62.2 46.8002C62.2 45.9515 61.8628 45.1376 61.2627 44.5375C60.6626 43.9373 59.8487 43.6002 59 43.6002H52.4688C52.6478 42.541 52.6478 41.4593 52.4688 40.4002H59C60.6974 40.4002 62.3252 41.0745 63.5255 42.2747C64.7257 43.4749 65.4 45.1028 65.4 46.8002C65.4 52.2114 62.7344 56.2914 58.568 58.9506C54.4656 61.565 48.936 62.8002 43 62.8002C37.064 62.8002 31.5344 61.565 27.432 58.9506C23.2656 56.2946 20.6 52.2082 20.6 46.8002C20.6 43.2386 23.4896 40.4002 27.0288 40.4002ZM55.8 24.4002C55.8007 26.5654 55.2521 28.6955 54.2055 30.591C53.159 32.4865 51.6487 34.0856 49.816 35.2386C48.9617 34.3772 47.9519 33.6855 46.84 33.2002C48.8614 32.318 50.5173 30.7667 51.5294 28.8071C52.5416 26.8476 52.8481 24.5993 52.3975 22.4403C51.9469 20.2813 50.7666 18.3433 49.0552 16.9522C47.3437 15.5611 45.2055 14.8016 43 14.8016C40.7945 14.8016 38.6562 15.5611 36.9448 16.9522C35.2333 18.3433 34.0531 20.2813 33.6025 22.4403C33.1519 24.5993 33.4584 26.8476 34.4705 28.8071C35.4826 30.7667 37.1386 32.318 39.16 33.2002C38.04 33.6898 37.032 34.3842 36.184 35.2386C33.7533 33.71 31.9072 31.4086 30.9424 28.7042C30.4502 27.3227 30.199 25.8668 30.2 24.4002C30.2 21.0054 31.5485 17.7497 33.949 15.3492C36.3495 12.9488 39.6052 11.6002 43 11.6002C46.3947 11.6002 49.6505 12.9488 52.0509 15.3492C54.4514 17.7497 55.8 21.0054 55.8 24.4002Z"
                    fill="#157C7B"
                  />
                </svg>

                <span className="inlibe-block text-lg font-semibold text-[#64748B]">
                  Get Support
                </span>
              </div>
              <ArrowUpRight className="size-5 text-primary" />
            </Link>
          </div>
        </div>

        <RecentShipment />
      </main>
    </div>
  );
}
