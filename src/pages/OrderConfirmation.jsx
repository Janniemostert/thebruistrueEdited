import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion } from "framer-motion";

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderNumber, total } = location.state || {};

  return (
    <div className="min-h-screen bg-[#FBF7F2] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full text-center"
      >
        <div className="bg-white rounded-3xl p-12 shadow-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-light text-[#1A0F0A] mb-3">
            Order Confirmed!
          </h1>
          
          <p className="text-[#1A0F0A]/60 mb-8">
            Thank you for your order. We've received it and will start processing it soon.
          </p>

          {orderNumber && (
            <div className="bg-[#FBF7F2] rounded-xl p-6 mb-8">
              <p className="text-xs text-[#1A0F0A]/40 uppercase tracking-wider mb-1">
                Order Number
              </p>
              <p className="text-2xl font-medium text-[#1A0F0A] mb-4">
                {orderNumber}
              </p>
              {total && (
                <>
                  <p className="text-xs text-[#1A0F0A]/40 uppercase tracking-wider mb-1">
                    Total Amount
                  </p>
                  <p className="text-xl font-semibold text-[#D4A574]">
                    R {total.toFixed(2)}
                  </p>
                </>
              )}
            </div>
          )}

          <p className="text-sm text-[#1A0F0A]/60 mb-8">
            You'll receive an email confirmation shortly with your order details.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to={createPageUrl("Shop")} className="flex-1">
              <Button
                variant="outline"
                className="w-full"
              >
                Continue Shopping
              </Button>
            </Link>
            <Link to={createPageUrl("Home")} className="flex-1">
              <Button
                className="w-full bg-[#D4A574] hover:bg-[#C49564] text-[#1A0F0A]"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}