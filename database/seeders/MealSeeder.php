<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Meal;
use App\Models\KitchenPartner;
use App\Models\Ingredients;

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
                'image_path' => '/image_paths/chicken-adobo.jpg',
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
                'image_path' => '/image_paths/fish-fillet.jpg',
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
                'image_path' => '/image_paths/baked-salmon.jpg',
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
                'image_path' => '/image_paths/vegetable-kare-kare.jpg',
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
                'image_path' => '/image_paths/pasta-salad.jpg',
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
                'image_path' => '/image_paths/scrambled-eggs.jpg',
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
                'image_path' => '/image_paths/grilled-chicken.jpg',
                'ingredients' => [
                    ['ing_name' => 'Chicken Breast', 'ing_type' => 'Meat', 'unit' => '400g'],
                    ['ing_name' => 'Olive Oil', 'ing_type' => 'Condiment', 'unit' => '2 tbsp'],
                    ['ing_name' => 'Lemon Juice', 'ing_type' => 'Condiment', 'unit' => '2 tbsp'],
                    ['ing_name' => 'Rosemary', 'ing_type' => 'Herb', 'unit' => '1 tsp'],
                ],
            ],
        ];

        $mealIndex = 0;
        foreach ($meals as $mealData) {
            
            // Assign meals to kitchen partners in a randomized
            $kitchenPartner = $kitchenPartners->random();

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
