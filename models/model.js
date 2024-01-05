import Sequelize, { DataTypes, Model } from 'sequelize';

// export const db = await connectToDB("postgresql://postgres:postgres@localhost:5432/ratings");

const sequelize = new Sequelize('postgresql://postgres:postgres@localhost:5432/recipe_app', {
  define: { underscored: true },
});

export class Ingredient extends Model {}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    units: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    modelName: 'ingredient',
    sequelize: sequelize,
    timestamps: false,
  }
);

export class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // author_id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   foreignKey: true,
    // },
  },
  {
    modelName: 'recipe',
    sequelize: sequelize,
    timestamps: false,
  }
);

export class Recipe_Ingredient extends Model {}

Recipe_Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // recipe_id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   foreignKey: true,
    // },
    // ingredient_id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   foreignKey: true,
    // },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    modelName: 'recipeIngredient',
    sequelize: sequelize,
    timestamps: false,
  }
);

export class Author extends Model {}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
  },
  {
    modelName: 'author',
    sequelize: sequelize,
    timestamps: false,
  }
);

// ANCHOR -- Declare Connections
// Ingredients (one) -> recipe_ingredients (many)
Ingredient.hasMany(Recipe_Ingredient, { foreignKey: 'ingredientId' });
Recipe_Ingredient.belongsTo(Ingredient, { foreignKey: 'ingredientId' });

// Recipes (one) -> recipe_ingredients (many)
Recipe.hasMany(Recipe_Ingredient, { foreignKey: 'recipeId' });
Recipe_Ingredient.belongsTo(Recipe, { foreignKey: 'recipeId' });
// author (one) -> recipes (many)
Author.hasMany(Recipe, { foreignKey: 'authorId' });
Recipe.belongsTo(Author, { foreignKey: 'authorId' });

// await sequelize.sync({ force: true });
// await sequelize.close();
