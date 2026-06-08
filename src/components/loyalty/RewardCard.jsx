import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RewardCard({ reward, index, userPoints, onRedeem, isRedeeming }) {
  const canRedeem = userPoints >= reward.points_cost;

  const rewardIcons = {
    discount: "🎫",
    free_shipping: "📦",
    product: "☕",
    merch: "👕",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 border border-[#1A0F0A]/10 hover:border-[#D4A574]/30 transition-colors"
    >
      <div className="text-4xl mb-4">{rewardIcons[reward.reward_type] || "🎁"}</div>
      
      <h3 className="font-medium text-[#1A0F0A] mb-2">{reward.name}</h3>
      
      {reward.description && (
        <p className="text-sm text-[#1A0F0A]/60 mb-4">{reward.description}</p>
      )}

      {reward.value && (
        <div className="bg-[#FBF7F2] rounded-lg px-3 py-2 mb-4">
          <p className="text-sm font-medium text-[#D4A574]">{reward.value}</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-[#D4A574]">{reward.points_cost}</span>
        <span className="text-sm text-[#1A0F0A]/40">points</span>
      </div>

      <Button
        onClick={() => onRedeem(reward)}
        disabled={!canRedeem || isRedeeming}
        className={`w-full ${
          canRedeem
            ? "bg-[#D4A574] hover:bg-[#C49564] text-[#1A0F0A]"
            : "bg-[#1A0F0A]/10 text-[#1A0F0A]/40 cursor-not-allowed"
        }`}
      >
        {canRedeem ? "Redeem" : "Not Enough Points"}
      </Button>
    </motion.div>
  );
}