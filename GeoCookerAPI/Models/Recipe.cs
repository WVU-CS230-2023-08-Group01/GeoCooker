using System;
namespace GeoCookerAPI.Models
{
	public class Recipe
	{
		public int ID { get; set; }
		public string user { get; set; }
		public double Lat { get; set; }
		public double Lon { get; set; }
		public string Location { get; set; }
		public string RecipeName { get; set; }
		public string Description { get; set; }
		public double Rating { get; set; }
		public ICollection<Instruction> Instructions { get; } = new List<Instruction>();
		public ICollection<Ingredient> Ingredients { get; } = new List<Ingredient>();

    }
}

