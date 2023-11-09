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
            new Recipe{RecipeName="curry"},
            new Recipe{RecipeName="getti"},
            };
            foreach (Recipe r in recipes)
            {
                context.Recipes.Add(r);
            }
            context.SaveChanges();

        }
    }
}

