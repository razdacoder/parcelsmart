import bannerImage from "@/assets/banner.png";
import AppNavBar from "@/components/app-navbar";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useMe from "@/features/auth/api/useMe";
import { columns } from "@/features/shipment/columns";
import { DataTable } from "@/features/shipment/components/data-table";
import useWallet from "@/features/wallet/api/useWallet";
import { useTopUpModal } from "@/features/wallet/hooks/use-top-up-modal";
import { shipments } from "@/lib/demo";
import { formatNaira } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const { data: user } = useMe();
  const { data, isLoading: walletLoading } = useWallet();
  const { onOpen } = useTopUpModal();

  return (
    <div className="flex flex-col gap-4 w-full overflow-hidden">
      <AppNavBar title="Overview" />
      <main className="px-4 md:px-8 space-y-6">
        <h3 className="text-xl font-bold text-text">
          Hi, {user?.data.first_name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          <div className="w-full md:col-span-6 lg:col-span-5 p-4 bg-[#0B2230] rounded-xl text-white flex items-center justify-between">
            <div className="space-y-1.5">
              <h6 className="text-sm">Wallet Balance</h6>
              {walletLoading && (
                <div className="w-full">
                  <Skeleton className="h-8 w-full bg-gray-600" />
                </div>
              )}
              {data && (
                <h1 className="text-xl lg:text-[28px] leading-9 font-bold">
                  {formatNaira(parseFloat(data?.data[0].balance!))}
                </h1>
              )}
            </div>
            <Button
              onClick={() => onOpen(data?.data[0].id!)}
              className="items-center gap-2 rounded-lg"
            >
              Top up <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="md:col-span-6 lg:col-span-7 rounded-lg">
            <img
              src={bannerImage}
              alt="Referal Banner"
              className="w-full rounded-lg h-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-4 flex items-center gap-4 text-text rounded-xl">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="12" fill="#EDF2FF" />
              <path
                d="M12.5 14C11.1187 14 10 15.12 10 16.5V26H26V16.5C26 15.1187 24.88 14 23.5 14H12.5ZM26 28H10V31.5C10 32.88 11.12 34 12.5 34H13C13 32.9391 13.4214 31.9217 14.1716 31.1716C14.9217 30.4214 15.9391 30 17 30C18.0609 30 19.0783 30.4214 19.8284 31.1716C20.5786 31.9217 21 32.9391 21 34H25C25.2652 34 25.5196 33.8946 25.7071 33.7071C25.8946 33.5196 26 33.2652 26 33V28Z"
                fill="#525F7F"
              />
              <path
                d="M19 34C19 33.4696 18.7893 32.9609 18.4142 32.5858C18.0391 32.2107 17.5304 32 17 32C16.4696 32 15.9609 32.2107 15.5858 32.5858C15.2107 32.9609 15 33.4696 15 34C15 34.5305 15.2107 35.0392 15.5858 35.4142C15.9609 35.7893 16.4696 36 17 36C17.5304 36 18.0391 35.7893 18.4142 35.4142C18.7893 35.0392 19 34.5305 19 34ZM29 17C28.7348 17 28.4804 17.1054 28.2929 17.2929C28.1054 17.4805 28 17.7348 28 18V33C28 33.116 28.02 33.2267 28.056 33.3307C28.2222 32.3456 28.751 31.4583 29.5384 30.8434C30.3258 30.2285 31.3148 29.9306 32.3108 30.0081C33.3069 30.0857 34.2378 30.5332 34.9205 31.2626C35.6033 31.9919 35.9883 32.9504 36 33.9494C37.1373 33.716 38.0293 32.7027 37.952 31.4387C37.6537 26.5565 35.9229 21.8706 32.976 17.9667C32.7464 17.6648 32.4499 17.4204 32.1098 17.2526C31.7697 17.0849 31.3952 16.9984 31.016 17H29Z"
                fill="#525F7F"
              />
              <path
                d="M34 34C34 33.4696 33.7893 32.9609 33.4142 32.5858C33.0391 32.2107 32.5304 32 32 32C31.4696 32 30.9609 32.2107 30.5858 32.5858C30.2107 32.9609 30 33.4696 30 34C30 34.5304 30.2107 35.0391 30.5858 35.4142C30.9609 35.7893 31.4696 36 32 36C32.5304 36 33.0391 35.7893 33.4142 35.4142C33.7893 35.0391 34 34.5304 34 34Z"
                fill="#525F7F"
              />
            </svg>
            <div className="space-y-1">
              <h6 className="text-xs font-medium">Total Shipments</h6>
              <h3 className="text-lg font-bold">207</h3>
            </div>
          </div>
          <div className="bg-white p-4 flex items-center gap-4 text-text rounded-xl">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="12" fill="#FEF3C7" />
              <path
                d="M24 11C21.4288 11 18.9154 11.7624 16.7776 13.1909C14.6398 14.6194 12.9735 16.6497 11.9896 19.0251C11.0056 21.4006 10.7482 24.0144 11.2498 26.5362C11.7514 29.0579 12.9895 31.3743 14.8076 33.1924C16.6257 35.0105 18.9421 36.2486 21.4638 36.7502C23.9856 37.2518 26.5995 36.9944 28.9749 36.0104C31.3503 35.0265 33.3807 33.3603 34.8091 31.2224C36.2376 29.0846 37 26.5712 37 24C36.9964 20.5533 35.6256 17.2488 33.1884 14.8116C30.7512 12.3744 27.4467 11.0036 24 11ZM31 25H24C23.7348 25 23.4804 24.8946 23.2929 24.7071C23.1054 24.5196 23 24.2652 23 24V17C23 16.7348 23.1054 16.4804 23.2929 16.2929C23.4804 16.1054 23.7348 16 24 16C24.2652 16 24.5196 16.1054 24.7071 16.2929C24.8946 16.4804 25 16.7348 25 17V23H31C31.2652 23 31.5196 23.1054 31.7071 23.2929C31.8946 23.4804 32 23.7348 32 24C32 24.2652 31.8946 24.5196 31.7071 24.7071C31.5196 24.8946 31.2652 25 31 25Z"
                fill="#F6A723"
              />
            </svg>

            <div className="space-y-1">
              <h6 className="text-xs font-medium">Shipment in Transit</h6>
              <h3 className="text-lg font-bold">14</h3>
            </div>
          </div>
          <div className="bg-white p-4 flex items-center gap-4 text-text rounded-xl">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="12" fill="#E0FEE9" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24 36C25.7072 36 27.3977 35.6896 28.9749 35.0866C30.5521 34.4835 31.9852 33.5996 33.1924 32.4853C34.3995 31.371 35.3571 30.0481 36.0104 28.5922C36.6637 27.1363 37 25.5759 37 24C37 22.4241 36.6637 20.8637 36.0104 19.4078C35.3571 17.9519 34.3995 16.629 33.1924 15.5147C31.9852 14.4004 30.5521 13.5165 28.9749 12.9134C27.3977 12.3104 25.7072 12 24 12C20.5522 12 17.2456 13.2643 14.8076 15.5147C12.3696 17.7652 11 20.8174 11 24C11 27.1826 12.3696 30.2348 14.8076 32.4853C17.2456 34.7357 20.5522 36 24 36ZM23.6649 28.8533L30.8871 20.8533L28.6684 19.1467L22.4573 26.0253L19.2434 23.0573L17.201 24.9427L21.5343 28.9427L22.6523 29.9747L23.6649 28.8533Z"
                fill="#24D164"
              />
            </svg>

            <div className="space-y-1">
              <h6 className="text-xs font-medium">Delivered Shipment</h6>
              <h3 className="text-lg font-bold">94</h3>
            </div>
          </div>
          <div className="bg-white p-4 flex items-center gap-4 text-text rounded-xl">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="48"
                height="48"
                rx="12"
                fill="#E74C3C"
                fill-opacity="0.2"
              />
              <path
                d="M19.2 30.6665L24 25.8665L28.8 30.6665L30.6666 28.7998L25.8666 23.9998L30.6666 19.1998L28.8 17.3332L24 22.1332L19.2 17.3332L17.3333 19.1998L22.1333 23.9998L17.3333 28.7998L19.2 30.6665ZM24 37.3332C22.1555 37.3332 20.4222 36.9829 18.8 36.2825C17.1777 35.5821 15.7666 34.6323 14.5666 33.4332C13.3666 32.2341 12.4169 30.8229 11.7173 29.1998C11.0177 27.5767 10.6675 25.8434 10.6666 23.9998C10.6657 22.1563 11.016 20.4229 11.7173 18.7998C12.4186 17.1767 13.3684 15.7656 14.5666 14.5665C15.7649 13.3674 17.176 12.4176 18.8 11.7172C20.424 11.0167 22.1573 10.6665 24 10.6665C25.8426 10.6665 27.576 11.0167 29.2 11.7172C30.824 12.4176 32.2351 13.3674 33.4333 14.5665C34.6315 15.7656 35.5817 17.1767 36.284 18.7998C36.9862 20.4229 37.336 22.1563 37.3333 23.9998C37.3306 25.8434 36.9804 27.5767 36.2826 29.1998C35.5849 30.8229 34.6351 32.2341 33.4333 33.4332C32.2315 34.6323 30.8204 35.5825 29.2 36.2838C27.5795 36.9852 25.8462 37.3349 24 37.3332Z"
                fill="#E74C3C"
              />
            </svg>

            <div className="space-y-1">
              <h6 className="text-xs font-medium">Canceled Shipment</h6>
              <h3 className="text-lg font-bold">40</h3>
            </div>
          </div>
        </div>

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
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M26.3333 48.3335H20.9999V37.6668M18.3333 16.3335H47.6666V48.3335M36.9999 48.3335H52.9999M63.6666 48.3335H68.9999V32.3335M68.9999 32.3335H47.6666M68.9999 32.3335L60.9999 19.0002H47.6666M20.9999 27.0002H31.6666"
                    stroke="#157C7B"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M52 28C52 47.0453 32 58 32 58C32 58 12 47.0453 12 28C12 22.6957 14.1071 17.6086 17.8579 13.8579C21.6086 10.1071 26.6957 8 32 8C37.3043 8 42.3914 10.1071 46.1421 13.8579C49.8929 17.6086 52 22.6957 52 28Z"
                    stroke="#157C7B"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text">Recent Shipments</h3>
            <Button variant="link" size="sm">
              View All
            </Button>
          </div>
          <div className="bg-white w-full p-8 space-y-2">
            <div className="flex flex-col md:flex-row md:justify-between lg:justify-end gap-3">
              <Input
                placeholder="Search..."
                className="py-2 h-11 w-full md:w-1/2 lg:w-56"
              />
              <DatePickerWithRange className="h-9 w-full md:w-1/2 lg:w-fit" />
            </div>
            <div>
              <DataTable columns={columns} data={shipments.slice(0, 5)} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
