import AppNavBar from "@/components/app-navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import QuoteForm from "@/features/quote/forms/quote-form.tsx";
import { formatNaira } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GetQuote() {
  const [quotes, setQuotes] = useState<Quote[]>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 w-full overflow-hidden">
      <AppNavBar title="Get Quote" />
      <main className="px-4 md:px-8 space-y-6">
        <div className="bg-white py-12 px-8 space-y-8">
          <QuoteForm setIsLoading={setIsLoading} setQuotes={setQuotes} />
          {isLoading && !quotes && (
            <div className="flex items-center justify-center py-12">
              <Loader className="text-primary size-6 animate-spin" />
            </div>
          )}
          {quotes && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Available Rates</h3>
              <div className="flex flex-col gap-2">
                {quotes.map((quote) => (
                  <div
                    key={quote.carrier_reference}
                    className="flex items-center space-x-2 w-full border-2 px-2 py-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between w-full px-2">
                      <div className="flex items-center gap-4 w-4/12">
                        <img
                          src={quote.carrier_logo}
                          alt="DHL Image"
                          className="size-8 md:size-12"
                        />
                        <div className="flex flex-col gap-1">
                          <h4 className="text-xs md:text-sm font-medium">
                            {quote.carrier_name}
                          </h4>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            Normal Delivery
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:flex flex-col gap-1">
                        <h4 className="text-sm font-medium">
                          Pickup: {quote.estimated_pickup_time}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Delivery: {quote.estimated_delivery_time}
                        </p>
                      </div>
                      {quote.dropoff_available && (
                        <Badge className="hidden md:inline-flex bg-muted text-text hover:bg-muted hover:text-text shadow-none">
                          Dropoff
                        </Badge>
                      )}

                      <h2 className="text-base md:text-xl font-bold">
                        {formatNaira(quote.amount)}
                      </h2>

                      <Button onClick={() => navigate("/shipment/new")}>
                        Book Shipment
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
