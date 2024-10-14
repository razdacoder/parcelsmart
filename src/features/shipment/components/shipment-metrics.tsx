import { Skeleton } from "@/components/ui/skeleton";
import useShipmentMetrics from "../api/useShipmentMetrics";

export default function ShipmentMetrics() {
  const {
    data: shipmentMetrics,
    isLoading: shipmentMetricsLoading,
    isError: shipmentMetricsError,
  } = useShipmentMetrics();
  return (
    <>
      {shipmentMetricsLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      )}
      {shipmentMetrics && (
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
              <h3 className="text-lg font-bold">
                {shipmentMetrics.data.total_shipments}
              </h3>
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
              <h3 className="text-lg font-bold">
                {shipmentMetrics.data.in_transit_shipments}
              </h3>
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
              <h3 className="text-lg font-bold">
                {shipmentMetrics.data.delivered_shipments}
              </h3>
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
              <h3 className="text-lg font-bold">
                {shipmentMetrics.data.cancelled_shipments}
              </h3>
            </div>
          </div>
        </div>
      )}

      {shipmentMetricsError && (
        <div className="flex justify-center items-center py-24">
          <p className="text-sm font-medium text-destructive">
            Failed to load shipment metrics
          </p>
        </div>
      )}
    </>
  );
}
