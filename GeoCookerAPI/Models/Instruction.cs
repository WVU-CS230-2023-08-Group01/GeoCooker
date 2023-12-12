using System;
namespace GeoCookerAPI.Models
{
    public class Instruction
    {
        public int ID { get; set; }
        public string Description { get; set; }

        // Foreign key to link the instruction to a recipe
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}

