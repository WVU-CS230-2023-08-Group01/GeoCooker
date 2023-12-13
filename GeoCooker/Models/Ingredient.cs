using System;
namespace GeoCooker.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Description { get; set; }

        // Foreign key to link the instruction to a recipe
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; } = null!;
    }
}

