using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace GeoCookerAPI.Models
{
    public class Ingredient
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IngredientId { get; set; }
        public string Description { get; set; }

        // Foreign key to link the instruction to a recipe
        public int RecipeId { get; set; }
        [ForeignKey("RecipeId")]

        public virtual Recipe? Recipe { get; set; } = null;
    }
}

