using System;
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

            var recipes = new Recipe[]
            {
            new Recipe{Lat=39.993220, Lon=-81.741108, Location="newconcord_oh", RecipeName="Beefy Birria Tacos", Description="Beefy tacos!", Rating=5},
            };
            foreach (Recipe r in recipes)
            {
                context.Recipes.Add(r);
            }
            context.SaveChanges();

        }
    }
}

