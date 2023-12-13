## data
This package creates a local database for the recipes.
It contains a model for this database defining basic get/set methods in (ApplicationDbContext.cs).
The other component, Dbinit, is a constructor for this class that populates the recipe database with random values if there is not an exisitng databse.