using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace GeoCookerAPI.Models
{
	public class Recipe
	{
		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int RecipeId { get; set; }
		public string user { get; set; }
		public double Lat { get; set; }
		public double Lon { get; set; }
		public string Location { get; set; }
		public string RecipeName { get; set; }
		public string Description { get; set; }
		public double Rating { get; set; }
		public double PrepTime { get; set; }
		public double CookTime { get; set; }
		[InverseProperty("Recipe")]
		public ICollection<Instruction> Instructions { get; set; } = new List<Instruction>();
		[InverseProperty("Recipe")]
		public ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
        [InverseProperty("Recipe")]
        public ICollection<Tag> Tags { get; set; } = new List<Tag>();
    }
}

