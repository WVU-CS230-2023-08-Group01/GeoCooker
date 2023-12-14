# data
This package creates database tables by using models. Relates all Foreign Keys and Primary Keys and one-one relationships and one-many relationships.
It contains a model for this database defining how the models will be mapped into DB tables in (ApplicationDbContext.cs).
The other component, Dbinit, is a constructor for this class that populates the recipe database with random values if there is not an exisitng databse.
