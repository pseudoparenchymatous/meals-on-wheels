<?php

namespace Database\Seeders;

use App\Models\Ingredients;
use App\Models\KitchenPartner;
use App\Models\Meal;
use Illuminate\Database\Seeder;

class MealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kitchenPartners = KitchenPartner::all();

        // List of hardcoded meals
        $meals = [
            [
                'name' => 'Chicken Adobo',
                'preparation_time' => '45 minutes',
                'image_path' => 'meals/chicken-adobo.jpg',
                'ingredients' => [
                    ['ing_name' => 'Chicken Thighs', 'ing_type' => 'Meat', 'unit' => '500g'],
                    ['ing_name' => 'Soy Sauce', 'ing_type' => 'Condiment', 'unit' => '4 tbsp'],
                    ['ing_name' => 'Garlic', 'ing_type' => 'Vegetable', 'unit' => '3 cloves'],
                    ['ing_name' => 'Bay Leaf', 'ing_type' => 'Spice', 'unit' => '2 pieces'],
                ],
            ],
            [
                'name' => 'Fish Fillet',
                'preparation_time' => '30 minutes',
                'image_path' => 'meals/fish-fillet.jpg',
                'ingredients' => [
                    ['ing_name' => 'Fish Fillet', 'ing_type' => 'Seafood', 'unit' => '300g'],
                    ['ing_name' => 'Breadcrumbs', 'ing_type' => 'Grains', 'unit' => '1 cup'],
                    ['ing_name' => 'Egg', 'ing_type' => 'Protein', 'unit' => '1 piece'],
                    ['ing_name' => 'Tartar Sauce', 'ing_type' => 'Condiment', 'unit' => '3 tbsp'],
                ],
            ],
            [
                'name' => 'Baked Salmon',
                'preparation_time' => '50 minutes',
                'image_path' => 'meals/baked-salmon.jpg',
                'ingredients' => [
                    ['ing_name' => 'Salmon Fillet', 'ing_type' => 'Seafood', 'unit' => '350g'],
                    ['ing_name' => 'Lemon', 'ing_type' => 'Fruit', 'unit' => '1 piece'],
                    ['ing_name' => 'Butter', 'ing_type' => 'Dairy', 'unit' => '2 tbsp'],
                    ['ing_name' => 'Broccoli', 'ing_type' => 'Vegetable', 'unit' => '1 cup'],
                ],
            ],
            [
                'name' => 'Vegetable Kare-Kare',
                'preparation_time' => '60 minutes',
                'image_path' => 'meals/Vegetable-Kare-Kare.jpg',
                'ingredients' => [
                    ['ing_name' => 'Peanut Butter', 'ing_type' => 'Condiment', 'unit' => '1/2 cup'],
                    ['ing_name' => 'Eggplant', 'ing_type' => 'Vegetable', 'unit' => '1 piece'],
                    ['ing_name' => 'String Beans', 'ing_type' => 'Vegetable', 'unit' => '100g'],
                    ['ing_name' => 'Banana Heart', 'ing_type' => 'Vegetable', 'unit' => '1 cup'],
                ],
            ],
            [
                'name' => 'Pasta Salad',
                'preparation_time' => '25 minutes',
                'image_path' => 'meals/Pasta-salad.jpg',
                'ingredients' => [
                    ['ing_name' => 'Pasta', 'ing_type' => 'Grains', 'unit' => '200g'],
                    ['ing_name' => 'Bell Pepper', 'ing_type' => 'Vegetable', 'unit' => '1 piece'],
                    ['ing_name' => 'Olives', 'ing_type' => 'Fruit', 'unit' => '1/4 cup'],
                    ['ing_name' => 'Feta Cheese', 'ing_type' => 'Dairy', 'unit' => '1/4 cup'],
                ],
            ],
            [
                'name' => 'Scrambled Eggs',
                'preparation_time' => '15 minutes',
                'image_path' => 'meals/scrambled-egg.jpg',
                'ingredients' => [
                    ['ing_name' => 'Eggs', 'ing_type' => 'Protein', 'unit' => '3 pieces'],
                    ['ing_name' => 'Milk', 'ing_type' => 'Dairy', 'unit' => '1/4 cup'],
                    ['ing_name' => 'Salt', 'ing_type' => 'Spice', 'unit' => '1 tsp'],
                    ['ing_name' => 'Butter', 'ing_type' => 'Dairy', 'unit' => '1 tbsp'],
                ],
            ],
            [
                'name' => 'Grilled Chicken',
                'preparation_time' => '40 minutes',
                'image_path' => 'meals/grilled-chicken.jpg',
                'ingredients' => [
                    ['ing_name' => 'Chicken Breast', 'ing_type' => 'Meat', 'unit' => '400g'],
                    ['ing_name' => 'Olive Oil', 'ing_type' => 'Condiment', 'unit' => '2 tbsp'],
                    ['ing_name' => 'Lemon Juice', 'ing_type' => 'Condiment', 'unit' => '2 tbsp'],
                    ['ing_name' => 'Rosemary', 'ing_type' => 'Herb', 'unit' => '1 tsp'],
                ],
            ],
            [
                'name'=> 'Beef Caldereta',
                'preparation_time'=> '1 hour',
                'image_path'=> 'meals/beef-caldereta.jpg',
                'ingredients'=> [
                    ['ing_name'=> 'Beef Cubes', 'ing_type'=> 'Meat', 'unit'=> '500g'],
                    ['ing_name'=> 'Tomato Sauce', 'ing_type'=> 'Condiment', 'unit' => '1 cup'],
                    ['ing_name'=> 'Potato', 'ing_type'=>  'Vegetable', 'unit'=> '2 pieces'],
                    ['ing_name'=> 'Carrot', 'ing_type'=>  'Vegetable', 'unit'=> '1 pieces'],
                ],
            ],
            [
                'name'=> 'Pancit Bihon',
                'preparation_time'=> '40 minutes',
                'image_path'=> 'meals/pancit-bihon.jpg',
                'ingredients'=> [
                    ['ing_name'=> 'Bihon Noodles', 'ing_type'=> 'Grains', 'unit'=> '250g'],
                    ['ing_name'=> 'Chicken Strips', 'ing_type'=> 'Meat', 'unit' => '200g'],
                    ['ing_name'=> 'Cabbage', 'ing_type'=> 'Vegetable', 'unit'=> '1 piece'],
                    ['ing_name'=> 'Carrot', 'ing_type'=> 'Vegetable', 'unit'=>  '1 piece'],
                ],
            ],
            [
                'name'=> 'Sweet and Sour Pork',
                'preparation_time' => '45 minutes',
                'image_path' =>'meals/Sweet-and-Sour-pork.jpg',
                'ingredients' => [
                    ['ing_name'=> 'Pork Cubes', 'ing_type'=> 'Meat', 'unit'=> '400g'],
                    ['ing_name'=> 'Pineapple Chunks', 'ing_type' => 'Fruit', 'unit' => '1 cup'],
                    ['ing_name'=> 'Bell Pepper', 'ing_type'=>   'Vegetable', 'unit'=> '1 piece'],
                    ['ing_name'=> 'Sweet and Sour Sauce', 'ing_type' => 'Condiment', 'unit'=>  '1/2 cup'],
                ],
            ],
            [
                'name'=> 'Sinigang na Baboy',
                'preparation_time'=> '1 hour',
                'image_path'=> 'meals/sinigang-na-baboy.jpg',
                'ingredients' => [
                    ['ing_name'=> 'Pork Ribs', 'ing_type'=> 'Meat', 'unit' => '500g'],
                    ['ing_name'=> 'Tamarind Soup Base', 'ing_type'=> 'Condiment', 'unit' => '1 pack'],
                    ['ing_name'=> 'Kangkong', 'ing_type'=>  'Vegetable', 'unit'=> '1 bunch'],
                    ['ing_name'=> 'Radish', 'ing_type' =>  'Vegetable', 'unit' => '1 piece'],
                ],
            ],
            [
                'name'=> 'Tuna Sandwich',
                'preparation_time' => '15 minutes',
                'image_path' => 'meals/Tuna-sandwich.jpg',
                'ingredients' => [
                    ['ing_name'=> 'Tuna Flakes', 'ing_type'=> 'Seafood', 'unit'=> '1 can'],
                    ['ing_name'=> 'Mayonnaise', 'ing_type'=> 'Condiment', 'unit' => '3 tbsp'],
                    ['ing_name'=> 'Bread Slices', 'ing_type'=> 'Grains', 'unit' => '2 pieces'],
                    ['ing_name'=> 'Lettuce', 'ing_type'=> 'Vegetables', 'unit'=> '2 leaves'],
                ],
            ],
            [
                'name'=> 'Fried Tilapia',
                'preparation_time'=> '30 minutes',
                'image_path'=> 'meals/Fried-Fish-Tilapia.jpg',
                'ingredients'=> [
                    ['ing_name'=> 'Tilapia Fish', 'ing_type'=> 'Seafood', 'unit'=> '2 piece'],
                    ['ing_name'=> 'Cooking Oil', 'ing_type'=> 'Condiment', 'unit' => '2 cups'],
                    ['ing_name'=> 'Salt', 'ing_type'=>  'Spice', 'unit' => '1 tsp'],
                    ['ing_name'=> 'Vinegar Dip', 'ing_type'=> 'Condiment ', 'unit' => '3 tbsp'],
                ],
            ],
            [
                'name'=> 'Chicken Curry',
                'preparation_time'=> '50 minutes',
                'image_path'=> 'meals/Chicken-curry.jpg',
                'ingredients'=> [
                    ['ing_name'=> 'Chicken', 'ing_type'=> 'Meat', 'unit' => '500g'],
                    ['ing_name'=> 'Curry Powder', 'ing_type'=>  'Spice', 'unit' => '2 tbsp'],
                    ['ing_name'=> 'Coconut Milk', 'ing_type'=> 'Condiment', 'unit' => '1 cup'],
                    ['ing_name'=> 'Potato', 'ing_type' => 'Vegetable', 'unit'=> '1 piece'],
                ],
            ],
            [
                'name'=> 'Lupiang Shanghai',
                'preparation_time'=> '1 hour',
                'image_path'=> 'meals/Lumpiang-Shanghai.jpg',
                'ingredients' => [
                    ['ing_name'=> 'Ground Pork', 'ing_type'=> 'Meat', 'unit'=> '400g'],
                    ['ing_name'=> 'Spring Roll Wrapper', 'ing_type'=>  'Grains', 'unit'=> '20 pieces'],
                    ['ing_name'=> 'Carrot', 'ing_type'=> 'Vegetable', 'unit' => '1 piece'],
                    ['ing_name'=> 'Garlic', 'ing_type'=> 'Vegetable', 'unit' => '3 cloves'],
                ],
            ],
            [
                'name'=> 'Ginataang Gulay',
                'preparation_time' => '35 minutes',
                'image_path' => 'meals/Ginataang-gulay.jpg',
                'ingredients' => [
                    ['ing_name'=> 'String Beans', 'ing_type'=> 'Vegetable', 'unit'=> '1 cup'],
                    ['ing_name'=> 'Strip Pork Belly', 'ing_type'=> 'Meat', 'unit'=> '100g'],
                    ['ing_name'=> 'Squash', 'ing_type'=> 'Vegetable', 'unit' => '1 cup'],
                    ['ing_name'=> 'Coconut Milk', 'ing_type'=> 'Condiment', 'unit'=> '1 cup'],
                    ['ing_name'=> 'Shrimp Paste', 'ing_type'=> 'Condiment', 'unit' => '2 tbsp'],
                ],
            ],
            [
                'name'=> 'Bangus Sisig',
                'preparation_time'=> '40 minutes',
                'image_path'=> 'meals/bangus-sisig.jpg',
                'ingredients'=> [
                    ['ing_name'=> 'Bangus', 'ing_type'=> 'Seafood', 'unit'=> '1 piece'],
                    ['ing_name'=> 'Onion', 'ing_type'=>  'Vegetable', 'unit'=> '1 piece'],
                    ['ing_name'=> 'Mayonnaise', 'ing_type'=> 'Condiment', 'unit'=> '3 tbsp'],
                    ['ing_name'=> 'Calamansi', 'ing_type' => 'Fruit', 'unit' => '2 pieces'],
                ],
            ],
            [
                'name' => 'Shrimp Tempura',
                'preparation_time' => '40 minutes',
                'image_path' => 'meals/Shrimp-Tempura.png',
                'ingredients' => [
                    ['ing_name' => 'Shrimp', 'ing_type' => 'Seafood', 'unit' => '300g'],
                    ['ing_name' => 'Tempura Batter', 'ing_type' => 'Grains', 'unit' => '1 cup'],
                    ['ing_name' => 'Cooking Oil', 'ing_type' => 'Condiment', 'unit' => '2 cups'],
                    ['ing_name' => 'Tempura Sauce', 'ing_type' => 'Condiment', 'unit' => '1/2 cup'],
                ],
            ],
            [
                'name' => 'Tortang Talong',
                'preparation_time' => '30 minutes',
                'image_path' => 'meals/Tortang-talong.jpg',
                'ingredients' => [
                    ['ing_name' => 'Eggplant', 'ing_type' => 'Vegetable', 'unit' => '1 piece'],
                    ['ing_name' => 'Egg', 'ing_type' => 'Protein', 'unit' => '1 piece'],
                    ['ing_name' => 'Salt', 'ing_type' => 'Spice', 'unit' => '1 tsp'],
                    ['ing_name' => 'Cooking Oil', 'ing_type' => 'Condiment', 'unit' => '3 tbsp'],
                ],
            ],
            [
                'name' => 'Chicken Teriyaki',
                'preparation_time' => '50 minutes',
                'image_path' => 'meals/chicken-Teriyaki.jpg',
                'ingredients' => [
                    ['ing_name' => 'Chicken Thighs', 'ing_type' => 'Meat', 'unit' => '500g'],
                    ['ing_name' => 'Teriyaki Sauce', 'ing_type' => 'Condiment', 'unit' => '1/2 cup'],
                    ['ing_name' => 'Sesame Seeds', 'ing_type' => 'Spice', 'unit' => '1 tbsp'],
                    ['ing_name' => 'Spring Onion', 'ing_type' => 'Vegetable', 'unit' => '2 stalks'],
                    ['ing_name' => 'Rice', 'ing_type' => 'Grain', 'unit' => '2 cups'],
                ],
            ],
            [
                'name' => 'Beef Stroganoff',
                'preparation_time' => '45 minutes',
                'image_path' => 'meals/Beef-Stroganoff.jpg',
                'ingredients' => [
                    ['ing_name' => 'Beef Strips', 'ing_type' => 'Meat', 'unit' => '300g'],
                    ['ing_name' => 'Mushrooms', 'ing_type' => 'Vegetable', 'unit' => '100g'],
                    ['ing_name' => 'Sour Cream', 'ing_type' => 'Dairy', 'unit' => '1 cup'],
                    ['ing_name' => 'Chili Peppers', 'ing_type' => 'Spice', 'unit' => '3 pieces'],
                    ['ing_name' => 'Rice', 'ing_type' => 'Grain', 'unit' => '2 cups'],
                ],
            ],
            [
                'name' => 'Tapsilog',
                'preparation_time' => '35 minutes',
                'image_path' => 'meals/Tapsilog.jpg',
                'ingredients' => [
                    ['ing_name' => 'Beef Tapa', 'ing_type' => 'Meat', 'unit' => '300g'],
                    ['ing_name' => 'Garlic Rice', 'ing_type' => 'Grains', 'unit' => '1 cup'],
                    ['ing_name' => 'Egg', 'ing_type' => 'Protein', 'unit' => '1 piece'],
                    ['ing_name' => 'Vinegar Dip', 'ing_type' => 'Condiment', 'unit' => '2 tbsp'],
                ],
            ],
            [
                'name' => 'Ginisang Ampalaya',
                'preparation_time' => '30 minutes',
                'image_path' => 'meals/ginisang-ampalaya.jpg',
                'ingredients' => [
                    ['ing_name' => 'Ampalaya', 'ing_type' => 'Vegetable', 'unit' => '1 piece'],
                    ['ing_name' => 'Egg', 'ing_type' => 'Protein', 'unit' => '1 piece'],
                    ['ing_name' => 'Tomato', 'ing_type' => 'Vegetable', 'unit' => '1 piece'],
                    ['ing_name' => 'Garlic', 'ing_type' => 'Vegetable', 'unit' => '3 cloves'],
                ],
            ],
        ];

        $mealIndex = 0;
        foreach ($meals as $mealData) {

            // Assign meals to kitchen partners in a randomized
            $kitchenPartner = $kitchenPartners[$mealIndex % $kitchenPartners->count()];

            $meal = Meal::create([
                'kitchen_partner_id' => $kitchenPartner->id,
                'name' => $mealData['name'],
                'preparation_time' => $mealData['preparation_time'],
                'image_path' => $mealData['image_path'],
            ]);

            foreach ($mealData['ingredients'] as $index => $ingredient) {
                $datePurchased = now()->subDays(rand(1, 5));
                $expirationDate = $index < 2 ? now()->addDays(rand(1, 3)) : now()->addMonths(rand(2, 6));

                Ingredients::create([
                    'meal_id' => $meal->id,
                    'ing_name' => $ingredient['ing_name'],
                    'ing_type' => $ingredient['ing_type'],
                    'unit' => $ingredient['unit'],
                    'date_arrive' => $datePurchased,
                    'expiration_date' => $expirationDate,
                ]);
            }

            $mealIndex++;
        }
    }
}
