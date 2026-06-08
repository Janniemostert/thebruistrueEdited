import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Award, Gift, Users, TrendingUp, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import RewardCard from "../components/loyalty/RewardCard";

export default function Loyalty() {
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
  });

  const { data: transactions = [], isLoading: transactionsLoading } = useQuery({
    queryKey: ["loyaltyTransactions", user?.email],
    queryFn: () => base44.entities.LoyaltyTransaction.filter({ user_email: user.email }, "-created_date"),
    enabled: !!user?.email,
  });

  const { data: rewards = [] } = useQuery({
    queryKey: ["rewards"],
    queryFn: () => base44.entities.Reward.filter({ active: true }),
  });

  const { data: referrals = [] } = useQuery({
    queryKey: ["referrals", user?.email],
    queryFn: () => base44.entities.Referral.filter({ referrer_email: user.email }),
    enabled: !!user?.email,
  });

  const redeemMutation = useMutation({
    mutationFn: async (reward) => {
      await base44.entities.LoyaltyTransaction.create({
        user_email: user.email,
        type: "spent",
        points: -reward.points_cost,
        reason: `Redeemed: ${reward.name}`,
        reward_id: reward.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loyaltyTransactions"] });
      toast.success("Reward redeemed successfully!");
    },
  });

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#FBF7F2] flex items-center justify-center">
        <p className="text-[#1A0F0A]/40">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FBF7F2] flex items-center justify-center">
        <div className="text-center">
          <Award className="h-16 w-16 text-[#1A0F0A]/20 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-[#1A0F0A] mb-4">Join Our Loyalty Program</h2>
          <p className="text-[#1A0F0A]/60 mb-6">Sign in to start earning points</p>
          <Button
            onClick={() => base44.auth.redirectToLogin(window.location.pathname)}
            className="bg-[#D4A574] hover:bg-[#C49564] text-[#1A0F0A]"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  const totalPoints = transactions.reduce((sum, t) => sum + t.points, 0);
  const earnedPoints = transactions.filter(t => t.type === "earned").reduce((sum, t) => sum + t.points, 0);
  const completedReferrals = referrals.filter(r => r.status === "completed").length;

  const referralLink = `${window.location.origin}?ref=${user.email}`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRedeem = (reward) => {
    if (totalPoints < reward.points_cost) {
      toast.error("Not enough points");
      return;
    }
    redeemMutation.mutate(reward);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F2]">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1600&q=80"
          alt="Coffee rewards"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1A0F0A]/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-[#D4A574] uppercase tracking-[0.25em] text-xs font-medium">
              Loyalty Rewards
            </span>
            <h1 className="text-5xl md:text-6xl font-light text-white mt-3">
              Your <span className="italic text-[#D4A574]">Points</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                <Award className="h-4 w-4 text-[#D4A574]" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#D4A574]">{totalPoints}</div>
                <p className="text-xs text-[#1A0F0A]/40 mt-1">Available to redeem</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Lifetime Earned</CardTitle>
                <TrendingUp className="h-4 w-4 text-[#D4A574]" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{earnedPoints}</div>
                <p className="text-xs text-[#1A0F0A]/40 mt-1">Points earned all time</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Referrals</CardTitle>
                <Users className="h-4 w-4 text-[#D4A574]" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completedReferrals}</div>
                <p className="text-xs text-[#1A0F0A]/40 mt-1">Friends referred</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Referral section */}
        <div className="bg-white rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center flex-shrink-0">
              <Users className="h-6 w-6 text-[#D4A574]" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-medium text-[#1A0F0A] mb-2">
                Refer a Friend, Earn Points
              </h2>
              <p className="text-[#1A0F0A]/60 text-sm mb-4">
                Share your unique referral link. When friends make their first purchase, you both earn 50 points!
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 px-4 py-2 bg-[#FBF7F2] rounded-lg text-sm text-[#1A0F0A]/60"
                />
                <Button
                  onClick={handleCopyReferral}
                  className="bg-[#D4A574] hover:bg-[#C49564] text-[#1A0F0A]"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Available rewards */}
        <div className="mb-12">
          <h2 className="text-2xl font-light text-[#1A0F0A] mb-6">
            Available <span className="italic text-[#D4A574]">Rewards</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewards.map((reward, index) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                index={index}
                userPoints={totalPoints}
                onRedeem={handleRedeem}
                isRedeeming={redeemMutation.isPending}
              />
            ))}
          </div>
        </div>

        {/* Points history */}
        <div>
          <h2 className="text-2xl font-light text-[#1A0F0A] mb-6">
            Points <span className="italic text-[#D4A574]">History</span>
          </h2>
          <div className="bg-white rounded-2xl p-6 space-y-4">
            {transactions.length === 0 ? (
              <p className="text-center text-[#1A0F0A]/40 py-8">No transactions yet</p>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-3 border-b border-[#1A0F0A]/5 last:border-0"
                >
                  <div>
                    <p className="font-medium text-[#1A0F0A] text-sm">{transaction.reason}</p>
                    <p className="text-xs text-[#1A0F0A]/40">
                      {new Date(transaction.created_date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`font-semibold ${
                      transaction.points > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.points > 0 ? "+" : ""}{transaction.points} pts
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}