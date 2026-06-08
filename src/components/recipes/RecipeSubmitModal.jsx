import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const brewMethods = [
  { value: "espresso", label: "Espresso" },
  { value: "pour-over", label: "Pour Over" },
  { value: "french-press", label: "French Press" },
  { value: "cold-brew", label: "Cold Brew" },
  { value: "aeropress", label: "AeroPress" },
  { value: "moka-pot", label: "Moka Pot" },
  { value: "drip", label: "Drip" },
  { value: "other", label: "Other" },
];

export default function RecipeSubmitModal({ open, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    coffee_type: "",
    brew_method: "",
    prep_time: "",
    author_name: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
    retry: false,
  });

  const submitMutation = useMutation({
    mutationFn: async (data) => {
      let image_url = null;
      
      if (imageFile) {
        setIsUploading(true);
        const uploadResult = await base44.integrations.Core.UploadFile({ file: imageFile });
        image_url = uploadResult.file_url;
        setIsUploading(false);
      }

      return base44.entities.Recipe.create({
        ...data,
        image_url,
        status: "pending",
        likes: 0,
      });
    },
    onSuccess: () => {
      toast.success("Recipe submitted! It will be reviewed shortly.");
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        coffee_type: "",
        brew_method: "",
        prep_time: "",
        author_name: "",
      });
      setImageFile(null);
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to submit recipe");
      setIsUploading(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMutation.mutate({
      ...formData,
      author_name: formData.author_name || user?.full_name || "Anonymous",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      setImageFile(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Share Your Recipe</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Recipe Title *</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Vanilla Cold Brew Delight"
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us about your recipe..."
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brew_method">Brew Method</Label>
              <Select
                value={formData.brew_method}
                onValueChange={(value) => setFormData({ ...formData, brew_method: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {brewMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="prep_time">Prep Time</Label>
              <Input
                id="prep_time"
                value={formData.prep_time}
                onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
                placeholder="e.g., 5 mins"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="coffee_type">Coffee Type</Label>
            <Input
              id="coffee_type"
              value={formData.coffee_type}
              onChange={(e) => setFormData({ ...formData, coffee_type: e.target.value })}
              placeholder="e.g., Morning Magic"
            />
          </div>

          <div>
            <Label htmlFor="ingredients">Ingredients</Label>
            <Textarea
              id="ingredients"
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              placeholder="List your ingredients (one per line)"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="instructions">Instructions *</Label>
            <Textarea
              id="instructions"
              required
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              placeholder="Step-by-step instructions..."
              rows={6}
            />
          </div>

          {!user && (
            <div>
              <Label htmlFor="author_name">Your Name</Label>
              <Input
                id="author_name"
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                placeholder="Your name (optional)"
              />
            </div>
          )}

          <div>
            <Label htmlFor="image">Recipe Photo</Label>
            <div className="mt-2">
              <label
                htmlFor="image"
                className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-[#1A0F0A]/20 rounded-lg hover:border-[#D4A574] transition-colors cursor-pointer"
              >
                <Upload className="h-5 w-5 text-[#1A0F0A]/40" />
                <span className="text-sm text-[#1A0F0A]/60">
                  {imageFile ? imageFile.name : "Click to upload photo"}
                </span>
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={submitMutation.isPending || isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitMutation.isPending || isUploading}
              className="flex-1 bg-[#D4A574] hover:bg-[#C49564] text-[#1A0F0A]"
            >
              {submitMutation.isPending || isUploading ? "Submitting..." : "Submit Recipe"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}