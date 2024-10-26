import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAlertModal } from "@/hooks/use-alert-modal";
import { Button } from "./ui/button";

export default function AlertPopUp() {
  const {
    isOpen,
    onClose,
    type,
    title,
    message,
    primaryLabel,
    secondaryLabel,
    primaryFn,
    secondaryFn,
  } = useAlertModal();
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="flex flex-col items-center gap-6 w-11/12 md:max-w-xl rounded-lg">
        {/* <button onClick={onClose} className="flex justify-center items-center size-10 absolute bg-white -top-12 right-0 rounded-full">
          <X className="size-5" />
        </button> */}
        {type === "warning" && (
          <svg
            width="104"
            height="104"
            viewBox="0 0 104 104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="48" cy="48" r="48" fill="#D27C2C" fill-opacity="0.25" />
            <path
              d="M45.3335 61.3335H50.6668V45.3335H45.3335V61.3335ZM48.0002 40.0002C48.7557 40.0002 49.3895 39.7442 49.9015 39.2322C50.4135 38.7202 50.6686 38.0873 50.6668 37.3335C50.6651 36.5797 50.4091 35.9468 49.8988 35.4348C49.3886 34.9228 48.7557 34.6668 48.0002 34.6668C47.2446 34.6668 46.6117 34.9228 46.1015 35.4348C45.5913 35.9468 45.3353 36.5797 45.3335 37.3335C45.3317 38.0873 45.5877 38.7211 46.1015 39.2348C46.6153 39.7486 47.2482 40.0037 48.0002 40.0002ZM48.0002 74.6668C44.3113 74.6668 40.8446 73.9664 37.6002 72.5655C34.3557 71.1646 31.5335 69.2651 29.1335 66.8668C26.7335 64.4686 24.8339 61.6464 23.4348 58.4002C22.0357 55.1539 21.3353 51.6873 21.3335 48.0002C21.3317 44.313 22.0322 40.8464 23.4348 37.6002C24.8375 34.3539 26.7371 31.5317 29.1335 29.1335C31.5299 26.7353 34.3522 24.8357 37.6002 23.4348C40.8482 22.0339 44.3148 21.3335 48.0002 21.3335C51.6855 21.3335 55.1522 22.0339 58.4002 23.4348C61.6482 24.8357 64.4704 26.7353 66.8668 29.1335C69.2633 31.5317 71.1637 34.3539 72.5682 37.6002C73.9726 40.8464 74.6722 44.313 74.6668 48.0002C74.6615 51.6873 73.9611 55.1539 72.5655 58.4002C71.1699 61.6464 69.2704 64.4686 66.8668 66.8668C64.4633 69.2651 61.6411 71.1655 58.4002 72.5682C55.1593 73.9708 51.6926 74.6704 48.0002 74.6668Z"
              fill="#D27C2C"
            />
          </svg>
        )}

        {type === "error" && (
          <svg
            width="104"
            height="104"
            viewBox="0 0 104 104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="48" cy="48" r="48" fill="#FF98B9" fill-opacity="0.4" />
            <path
              d="M38.3997 61.3335L47.9997 51.7335L57.5997 61.3335L61.333 57.6002L51.733 48.0002L61.333 38.4002L57.5997 34.6668L47.9997 44.2668L38.3997 34.6668L34.6663 38.4002L44.2663 48.0002L34.6663 57.6002L38.3997 61.3335ZM47.9997 74.6668C44.3108 74.6668 40.8441 73.9664 37.5997 72.5655C34.3552 71.1646 31.533 69.2651 29.133 66.8668C26.733 64.4686 24.8335 61.6464 23.4343 58.4002C22.0352 55.1539 21.3348 51.6873 21.333 48.0002C21.3312 44.313 22.0317 40.8464 23.4343 37.6002C24.837 34.3539 26.7366 31.5317 29.133 29.1335C31.5295 26.7353 34.3517 24.8357 37.5997 23.4348C40.8477 22.0339 44.3143 21.3335 47.9997 21.3335C51.685 21.3335 55.1517 22.0339 58.3997 23.4348C61.6477 24.8357 64.4699 26.7353 66.8663 29.1335C69.2628 31.5317 71.1632 34.3539 72.5677 37.6002C73.9721 40.8464 74.6717 44.313 74.6663 48.0002C74.661 51.6873 73.9606 55.1539 72.565 58.4002C71.1695 61.6464 69.2699 64.4686 66.8663 66.8668C64.4628 69.2651 61.6406 71.1655 58.3997 72.5682C55.1588 73.9708 51.6921 74.6704 47.9997 74.6668Z"
              fill="#E74C3C"
            />
          </svg>
        )}

        {type === "success" && (
          <svg
            width="104"
            height="104"
            viewBox="0 0 104 104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="48" cy="48" r="48" fill="#E0FEE9" />
            <g clipPath="url(#clip0_870_326)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M47.5 74C50.98 74 54.426 73.3146 57.6411 71.9828C60.8562 70.6511 63.7776 68.6991 66.2383 66.2383C68.6991 63.7776 70.6511 60.8562 71.9828 57.6411C73.3146 54.426 74 50.98 74 47.5C74 44.02 73.3146 40.574 71.9828 37.3589C70.6511 34.1438 68.6991 31.2224 66.2383 28.7617C63.7776 26.3009 60.8562 24.3489 57.6411 23.0172C54.426 21.6854 50.98 21 47.5 21C40.4718 21 33.7314 23.792 28.7617 28.7617C23.792 33.7314 21 40.4718 21 47.5C21 54.5282 23.792 61.2686 28.7617 66.2383C33.7314 71.208 40.4718 74 47.5 74ZM46.8169 58.2178L61.5391 40.5511L57.0164 36.7822L44.3553 51.9726L37.8039 45.4183L33.6405 49.5817L42.4738 58.4151L44.7528 60.6941L46.8169 58.2178Z"
                fill="#24D164"
              />
            </g>
            <defs>
              <clipPath id="clip0_870_326">
                <rect
                  width="53"
                  height="53"
                  fill="white"
                  transform="translate(21 21)"
                />
              </clipPath>
            </defs>
          </svg>
        )}
        <AlertDialogHeader className="flex flex-col items-center">
          <AlertDialogTitle className="text-center text-3xl font-medium text-text">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm font-medium text-muted-foreground">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex items-center justify-start gap-4">
          <Button
            onClick={secondaryFn}
            className="w-full text-primary bg-[#E2FAEC] hover:bg-[#E2FAEC]/80 hover:text-primary/80 shadow-none"
            size="lg"
          >
            {secondaryLabel}
          </Button>
          <Button onClick={primaryFn} className="w-full" size="lg">
            {primaryLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
