using System;
using System.Collections.Generic;
using System.Diagnostics;
using GeoCookerAPI.Models;


namespace GeoCookerAPI.Data
{
	public class DbInit
	{
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Recipes.Any())
            {
                return;   // DB has been seeded
            }

            Random random = new Random();

            List<string> tagsList = new List<string>
            {
                "Easy", "Quick", "Healthy", "Vegetarian", "Dessert", "Italian", "Spicy", "Grilled"
            };

            List<Recipe> entries = new List<Recipe>();

            for (int i = 0; i < 1000; i++)
            {
                double[] randomCoordinate = GenerateCoords.GetRandomLandCoordinate();

                Recipe entry = new Recipe
                {
                    Lat = randomCoordinate[0],
                    Lon = randomCoordinate[1],
                    user = "test@gmail.com",
                    RecipeName = "Recipe " + (i + 1),
                    Description = "Description for Recipe " + (i + 1),
                    Location = "Location " + (i + 1),
                    Rating = Math.Round(random.NextDouble() * 5, 1), // Generates a random rating between 0 and 5
                    PrepTime = Math.Round(random.NextDouble() * 25, 0), // Generates a random rating between 0 and 5
                    CookTime = Math.Round(random.NextDouble() * 60, 0), // Generates a random rating between 0 and 5


                };


                // Randomly pick 1-3 tags from the tagsList
                int numTags = random.Next(1, 4);
                for (int j = 0; j < numTags; j++)
                {
                    int index = random.Next(0, tagsList.Count);
                    entry.Tags.Add(new Tag { Description = tagsList[index] });
                }

                int numInstructions = random.Next(3, 6);
                for (int k = 0; k < numInstructions; k++)
                {
                    entry.Instructions.Add(new Instruction { Description = "Step " + (k + 1) });
                }

                // Add 3-5 random strings to Ingredients
                int numIngredients = random.Next(3, 6);
                for (int l = 0; l < numIngredients; l++)
                {
                    entry.Ingredients.Add(new Ingredient { Description = "Ingredient " + (l + 1) });
                }

                entries.Add(entry);
            }
           
            foreach (Recipe r in entries)
            {
                context.Recipes.Add(r);
            }
            context.SaveChanges();

        }
    }
}

