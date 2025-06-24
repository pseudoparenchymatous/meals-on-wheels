<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Ingredients;
use App\Models\MealAssignment;

class MealController extends Controller
{
    public function index()
    {   
        
         $user = auth()->user();

        if (auth()->user()->userable_type === 'admin') {
        // Admin: Show all meals
            $meals = Meal::with('ingredients')->get();
        } else {
        // Kitchen Partner: Show only their meals
            $meals = auth()->user()->userable->meals;
        }
        
        $ingredients = Ingredients::with('meal')->get()->map(function ($ing) {
        return [
            'id' => $ing->id,
            'ing_name' => $ing->ing_name,
            'ing_type' => $ing->ing_type,
            'unit' => $ing->unit,
            'date_arrive' => $ing->date_arrive,
            'expiration_date' => $ing->expiration_date,
            'meal_name'=> $ing->meal ? $ing->meal->name : 'N/A',
            ];
        });
        // Render different pages based on role
        if (auth()->user()->userable_type === 'admin') {
            return Inertia::render('Admin/AdminMeals', [
                'meals' => $meals,
                'ingredients' => $ingredients,
            ]);
        } else {
            return Inertia::render('KitchenPartner/KitchenMeal', [
                'meals' => $meals,
                'ingredients' => $ingredients,
            ]);
        }
    }

    public function store(Request $request)
    {
        logger($request->all());

        $validated = $request->validate([
            'name' => 'required|string',
            'meal_tag' => 'required|string',
            'preparation_time' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('meals', 'public');
        }

        $meal = auth()->user()->userable->meals()->create([
            'name' => $validated['name'],
            'meal_tag' => $validated['meal_tag'],
            'preparation_time' => $validated['preparation_time'],
            'image_path' => $path,
        ]);

        if ($request->has('ingredients')) {

            $ingredients = json_decode($request->ingredients, true);

            foreach ($ingredients as $ing) {
                $meal->ingredients()-> create([
                    'ing_name' => $ing['ing_name'],
                    'ing_type' => $ing['ing_type'],
                    'unit' => $ing['unit'],
                    'date_arrive' => $ing['date_arrive'],
                    'expiration_date' => $ing['expiration_date'],
                ]);
            }
        }

        return redirect()->back()->with('success', 'Meal added!');
    }

    public function update(Request $request, $id) {
        $meal = Meal::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string',
            'meal_tag' => 'required|string',
            'preparation_time' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('meals', 'public');
            $meal->image_path = $path;
        }

        $meal->update([
            'name' => $validated['name'],
            'meal_tag' => $validated['meal_tag'],
            'preparation_time' => $validated['preparation_time']
        ]);

    return redirect()->back()->with('success', 'Meal updated successfully!');
}

    public function destroy(Meal $meal)
    {
        $meal->delete();

        return redirect(url('/kitchen-partner/meals'))
            ->with('success', 'Meal deleted!');
    }
}
