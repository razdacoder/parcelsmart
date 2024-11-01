import { Checkbox } from "@/components/ui/checkbox";

export default function NotificationsView() {
  return (
    <div>
      <div className="bg-primary p-4 rounded-md grid grid-cols-12 gap-8">
        <div className="col-span-6">
          <h3 className="text-white text-xl font-semibold">Email</h3>
        </div>
      </div>
      <div className="divide-y-[1px] divide-gray-200">
        <div className="grid grid-cols-12 gap-8 p-4">
          <div className="col-span-8 md:col-span-6 flex items-center gap-4">
            <svg
              width="23"
              height="7"
              viewBox="0 0 23 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 6.61621C4.65685 6.61621 6 5.27307 6 3.61621C6 1.95936 4.65685 0.616211 3 0.616211C1.34315 0.616211 0 1.95936 0 3.61621C0 5.27307 1.34315 6.61621 3 6.61621ZM9 4.11621H9.7V3.11621H9V4.11621ZM11.1 4.11621H12.5V3.11621H11.1V4.11621ZM13.9 4.11621H15.3V3.11621H13.9V4.11621ZM16.7 4.11621H18.1V3.11621H16.7V4.11621ZM19.5 4.11621H20.9V3.11621H19.5V4.11621ZM22.3 4.11621H23V3.11621H22.3V4.11621Z"
                fill="#212121"
              />
            </svg>
            <div className="flex flex-col gap-0.5">
              <h6 className="text-base md:text-lg font-semibold text-text">
                Account Activity
              </h6>

              <p className="text-xs md:text-sm text-gray-500">
                Get important notifications about your account
              </p>
            </div>
          </div>
          <div className="col-span-2 md:col-span-4 flex justify-end">
            <Checkbox className="accent-[#24D164] size-6" checked />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8 p-4">
          <div className="col-span-8 md:col-span-6 flex items-center gap-4">
            <svg
              width="23"
              height="7"
              viewBox="0 0 23 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 6.61621C4.65685 6.61621 6 5.27307 6 3.61621C6 1.95936 4.65685 0.616211 3 0.616211C1.34315 0.616211 0 1.95936 0 3.61621C0 5.27307 1.34315 6.61621 3 6.61621ZM9 4.11621H9.7V3.11621H9V4.11621ZM11.1 4.11621H12.5V3.11621H11.1V4.11621ZM13.9 4.11621H15.3V3.11621H13.9V4.11621ZM16.7 4.11621H18.1V3.11621H16.7V4.11621ZM19.5 4.11621H20.9V3.11621H19.5V4.11621ZM22.3 4.11621H23V3.11621H22.3V4.11621Z"
                fill="#212121"
              />
            </svg>
            <div className="flex flex-col gap-0.5">
              <h6 className="text-base md:text-lg font-semibold text-text">
                Communications
              </h6>

              <p className="text-xs md:text-sm text-gray-500">
                Receive notifications for every shipped item
              </p>
            </div>
          </div>
          <div className="col-span-2 md:col-span-4 flex justify-end">
            <Checkbox className="accent-[#24D164] size-6" checked />
          </div>
        </div>
      </div>
      <div className="bg-primary p-4 rounded-md grid grid-cols-12 gap-8">
        <div className="col-span-6">
          <h3 className="text-white text-xl font-semibold">SMS</h3>
        </div>
      </div>
      <div className="divide-y-[1px] divide-gray-200">
        <div className="grid grid-cols-12 gap-8 p-4">
          <div className="col-span-8 md:col-span-6 flex items-center gap-4">
            <svg
              width="23"
              height="7"
              viewBox="0 0 23 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 6.61621C4.65685 6.61621 6 5.27307 6 3.61621C6 1.95936 4.65685 0.616211 3 0.616211C1.34315 0.616211 0 1.95936 0 3.61621C0 5.27307 1.34315 6.61621 3 6.61621ZM9 4.11621H9.7V3.11621H9V4.11621ZM11.1 4.11621H12.5V3.11621H11.1V4.11621ZM13.9 4.11621H15.3V3.11621H13.9V4.11621ZM16.7 4.11621H18.1V3.11621H16.7V4.11621ZM19.5 4.11621H20.9V3.11621H19.5V4.11621ZM22.3 4.11621H23V3.11621H22.3V4.11621Z"
                fill="#212121"
              />
            </svg>
            <div className="flex flex-col gap-0.5">
              <h6 className="text-base md:text-lg font-semibold text-text">
                Account Activity
              </h6>

              <p className="text-xs md:text-sm text-gray-500">
                Get important notifications about your account
              </p>
            </div>
          </div>
          <div className="col-span-2 md:col-span-4 flex justify-end">
            <Checkbox className="accent-[#24D164] size-6" checked />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8 p-4">
          <div className="col-span-8 md:col-span-6 flex items-center gap-4">
            <svg
              width="23"
              height="7"
              viewBox="0 0 23 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 6.61621C4.65685 6.61621 6 5.27307 6 3.61621C6 1.95936 4.65685 0.616211 3 0.616211C1.34315 0.616211 0 1.95936 0 3.61621C0 5.27307 1.34315 6.61621 3 6.61621ZM9 4.11621H9.7V3.11621H9V4.11621ZM11.1 4.11621H12.5V3.11621H11.1V4.11621ZM13.9 4.11621H15.3V3.11621H13.9V4.11621ZM16.7 4.11621H18.1V3.11621H16.7V4.11621ZM19.5 4.11621H20.9V3.11621H19.5V4.11621ZM22.3 4.11621H23V3.11621H22.3V4.11621Z"
                fill="#212121"
              />
            </svg>
            <div className="flex flex-col gap-0.5">
              <h6 className="text-base md:text-lg font-semibold text-text">
                Communications
              </h6>

              <p className="text-xs md:text-sm text-gray-500">
                Receive notifications for every shipped item
              </p>
            </div>
          </div>
          <div className="col-span-2 md:col-span-4 flex justify-end">
            <Checkbox className="accent-[#24D164] size-6" checked />
          </div>
        </div>
      </div>
    </div>
  );
}
