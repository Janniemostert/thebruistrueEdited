import { motion } from "framer-motion";
import { Heart, MessageCircle, Clock, User, Coffee } from "lucide-react";
import { useState } from "react";
import RecipeDetailModal from "./RecipeDetailModal";

export default function RecipeCard({ recipe, index, featured = false }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group cursor-pointer"
        onClick={() => setShowDetail(true)}
      >
        <div className={`relative ${featured ? 'aspect-[4/3]' : 'aspect-square'} rounded-2xl overflow-hidden mb-4 bg-gray-100`}>
          <img
            src={recipe.image_url || "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80"}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-[#D4A574] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                Featured
              </span>
            </div>
          )}

          {recipe.brew_method && (
            <div className="absolute top-3 right-3">
              <span className="bg-white/90 backdrop-blur-sm text-[#1A0F0A] text-xs font-medium px-3 py-1.5 rounded-full capitalize">
                {recipe.brew_method.replace('-', ' ')}
              </span>
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2 text-white/80 text-xs mb-2">
              <User className="h-3 w-3" />
              <span>{recipe.author_name || recipe.created_by || "Anonymous"}</span>
              {recipe.prep_time && (
                <>
                  <span>•</span>
                  <Clock className="h-3 w-3" />
                  <span>{recipe.prep_time}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-[#1A0F0A] font-medium group-hover:text-[#D4A574] transition-colors line-clamp-2">
            {recipe.title}
          </h3>
          <p className="text-[#1A0F0A]/50 text-sm line-clamp-2">
            {recipe.description}
          </p>

          <div className="flex items-center gap-4 text-[#1A0F0A]/40 text-sm pt-2">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{recipe.likes || 0}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <RecipeDetailModal
        recipe={recipe}
        open={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
}