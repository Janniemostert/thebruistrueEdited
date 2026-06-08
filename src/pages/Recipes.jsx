import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Plus, Filter, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecipeCard from "../components/recipes/RecipeCard";
import RecipeSubmitModal from "../components/recipes/RecipeSubmitModal";

const brewMethods = [
  { id: "all", label: "All Methods" },
  { id: "espresso", label: "Espresso" },
  { id: "pour-over", label: "Pour Over" },
  { id: "french-press", label: "French Press" },
  { id: "cold-brew", label: "Cold Brew" },
  { id: "aeropress", label: "AeroPress" },
  { id: "moka-pot", label: "Moka Pot" },
  { id: "drip", label: "Drip" },
  { id: "other", label: "Other" },
];

export default function Recipes() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showSubmit, setShowSubmit] = useState(false);

  const { data: recipes = [], isLoading, refetch } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => base44.entities.Recipe.filter({ status: "approved" }, "-created_date"),
  });

  const filteredRecipes = activeFilter === "all"
    ? recipes
    : recipes.filter(r => r.brew_method === activeFilter);

  const featuredRecipes = recipes.filter(r => r.featured);

  return (
    <div className="min-h-screen bg-[#FBF7F2]">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80"
          alt="Coffee brewing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1A0F0A]/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-[#D4A574] uppercase tracking-[0.25em] text-xs font-medium">
              Community
            </span>
            <h1 className="text-5xl md:text-6xl font-light text-white mt-3">
              My Bru <span className="italic text-[#D4A574]">Recipes</span>
            </h1>
            <p className="text-white/60 mt-4 max-w-xl mx-auto px-6">
              Share your favourite coffee creations with the community
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Submit recipe button */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex flex-wrap gap-2">
            {brewMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setActiveFilter(method.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === method.id
                    ? "bg-[#1A0F0A] text-white"
                    : "bg-white text-[#1A0F0A]/60 hover:bg-[#1A0F0A]/5 border border-[#1A0F0A]/10"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>

          <Button
            onClick={() => setShowSubmit(true)}
            className="bg-[#D4A574] hover:bg-[#C49564] text-[#1A0F0A] rounded-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Share Recipe
          </Button>
        </div>

        {/* Featured recipes */}
        {featuredRecipes.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light text-[#1A0F0A] mb-6">
              Featured <span className="italic text-[#D4A574]">Recipes</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredRecipes.slice(0, 3).map((recipe, index) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={index} featured />
              ))}
            </div>
          </div>
        )}

        {/* All recipes */}
        <h2 className="text-2xl font-light text-[#1A0F0A] mb-6">
          Community <span className="italic text-[#D4A574]">Brews</span>
        </h2>

        {isLoading ? (
          <div className="text-center py-20 text-[#1A0F0A]/40">Loading recipes...</div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-20">
            <Coffee className="h-16 w-16 text-[#1A0F0A]/20 mx-auto mb-4" />
            <p className="text-[#1A0F0A]/40">No recipes found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>
        )}
      </div>

      <RecipeSubmitModal
        open={showSubmit}
        onClose={() => setShowSubmit(false)}
        onSuccess={() => {
          setShowSubmit(false);
          refetch();
        }}
      />
    </div>
  );
}