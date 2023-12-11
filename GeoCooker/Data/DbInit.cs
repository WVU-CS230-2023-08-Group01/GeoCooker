using System;
using System.Collections.Generic;
using System.Diagnostics;
using GeoCooker.Models;


namespace GeoCooker.Data
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
                    

                };

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

