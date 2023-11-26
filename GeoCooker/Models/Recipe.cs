using System;
namespace GeoCooker.Models
{
	public class Recipe
	{
		public int ID { get; set; }
		public double Lat { get; set; }
		public double Lon { get; set; }
		public string Location { get; set; }
		public string RecipeName { get; set; }
		public string Description { get; set; }
		public int Rating { get; set; }
        public ICollection<Instruction> Instructions { get; set; }
        public ICollection<Ingredient> Ingredients { get; set; }

    }
}

