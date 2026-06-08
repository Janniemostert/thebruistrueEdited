import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Heart, Clock, User, Coffee, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function RecipeDetailModal({ recipe, open, onClose }) {
  const [comment, setComment] = useState("");
  const [commentName, setCommentName] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const queryClient = useQueryClient();

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", recipe?.id],
    queryFn: () => base44.entities.RecipeComment.filter({ recipe_id: recipe.id }, "-created_date"),
    enabled: !!recipe?.id && open,
  });

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
    retry: false,
  });

  useEffect(() => {
    if (user && recipe) {
      base44.entities.RecipeLike.filter({ recipe_id: recipe.id, user_email: user.email })
        .then(likes => setHasLiked(likes.length > 0))
        .catch(() => setHasLiked(false));
    }
  }, [user, recipe]);

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (hasLiked) {
        const likes = await base44.entities.RecipeLike.filter({ 
          recipe_id: recipe.id, 
          user_email: user.email 
        });
        if (likes[0]) {
          await base44.entities.RecipeLike.delete(likes[0].id);
        }
        await base44.entities.Recipe.update(recipe.id, { 
          likes: Math.max(0, (recipe.likes || 0) - 1) 
        });
      } else {
        await base44.entities.RecipeLike.create({ 
          recipe_id: recipe.id, 
          user_email: user.email 
        });
        await base44.entities.Recipe.update(recipe.id, { 
          likes: (recipe.likes || 0) + 1 
        });
      }
    },
    onSuccess: () => {
      setHasLiked(!hasLiked);
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: (data) => base44.entities.RecipeComment.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", recipe.id] });
      setComment("");
      setCommentName("");
      toast.success("Comment added!");
    },
  });

  const handleLike = () => {
    if (!user) {
      toast.error("Please log in to like recipes");
      return;
    }
    likeMutation.mutate();
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    commentMutation.mutate({
      recipe_id: recipe.id,
      author_name: commentName || user?.full_name || "Anonymous",
      comment: comment.trim(),
    });
  };

  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-light">{recipe.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
            <img
              src={recipe.image_url || "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80"}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#1A0F0A]/60">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{recipe.author_name || recipe.created_by || "Anonymous"}</span>
            </div>
            {recipe.prep_time && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{recipe.prep_time}</span>
              </div>
            )}
            {recipe.brew_method && (
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                <span className="capitalize">{recipe.brew_method.replace('-', ' ')}</span>
              </div>
            )}
          </div>

          {/* Like button */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLike}
              disabled={!user}
              className={hasLiked ? "text-red-500 border-red-300" : ""}
            >
              <Heart className={`h-4 w-4 mr-2 ${hasLiked ? "fill-red-500" : ""}`} />
              {recipe.likes || 0} {recipe.likes === 1 ? "Like" : "Likes"}
            </Button>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-medium text-[#1A0F0A] mb-2">About</h3>
            <p className="text-[#1A0F0A]/60 leading-relaxed">{recipe.description}</p>
          </div>

          {/* Ingredients */}
          {recipe.ingredients && (
            <div>
              <h3 className="font-medium text-[#1A0F0A] mb-2">Ingredients</h3>
              <p className="text-[#1A0F0A]/60 whitespace-pre-line">{recipe.ingredients}</p>
            </div>
          )}

          {/* Instructions */}
          <div>
            <h3 className="font-medium text-[#1A0F0A] mb-2">Instructions</h3>
            <p className="text-[#1A0F0A]/60 whitespace-pre-line leading-relaxed">
              {recipe.instructions}
            </p>
          </div>

          {/* Comments */}
          <div className="border-t border-[#1A0F0A]/10 pt-6">
            <h3 className="font-medium text-[#1A0F0A] mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Comments ({comments.length})
            </h3>

            {/* Comment form */}
            <form onSubmit={handleComment} className="mb-6 space-y-3">
              {!user && (
                <Input
                  placeholder="Your name"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                />
              )}
              <Textarea
                placeholder="Share your thoughts..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
              />
              <Button
                type="submit"
                size="sm"
                disabled={!comment.trim() || commentMutation.isPending}
                className="bg-[#D4A574] hover:bg-[#C49564] text-[#1A0F0A]"
              >
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </Button>
            </form>

            {/* Comments list */}
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="bg-[#FBF7F2] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#D4A574]/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-[#D4A574]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-[#1A0F0A]">
                        {c.author_name || "Anonymous"}
                      </p>
                      <p className="text-xs text-[#1A0F0A]/40">
                        {new Date(c.created_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#1A0F0A]/60 text-sm">{c.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}