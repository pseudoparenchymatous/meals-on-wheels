<?php

namespace App\Http\Controllers;

use App\Models\Ingredients;
use App\Models\Meal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MealController extends Controller
{
    public function index()
    {

        $user = auth()->user();

        // Check if Admin or Kitchen Partner
        if ($user->userable_type === 'admin') {
            // Admin: All meals and all ingredients
            $meals = Meal::with(['ingredients', 'kitchenPartner'])->get();
            $ingredients = Ingredients::with('meal')->get();

        } else {

            $meals = auth()->user()->userable->meals()->with('kitchenPartner')->get();

            $meal_id = $meals->pluck('id');
            $ingredients = Ingredients::with('meal')->whereIn('meal_id', $meal_id)->get();
        }

        // Shared meal mapping for both roles
        $meals = $this->formatMeals($meals);
        $ingredients = $this->formatIngredients($ingredients);

        if ($user->userable_type === 'admin') {
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
            $originalName = $request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs('meals', $originalName);
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
                $meal->ingredients()->create([
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

    public function update(Request $request, $id)
    {
        $meal = Meal::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string',
            'meal_tag' => 'required|string',
            'preparation_time' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);
        $updateData = [
            'name' => $validated['name'],
            'meal_tag' => $validated['meal_tag'],
            'preparation_time' => $validated['preparation_time'],
        ];

        if ($request->hasFile('image')) {
            $originalName = $request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs('updatedmeals', $originalName);
            $updateData['image_path'] = $path;
        }

        $meal->update($updateData);

        return redirect()->back()->with('success', 'Meal updated successfully!');
    }

    public function destroy(Meal $meal)
    {
        $meal->delete();

        return redirect()->back()->with('success', 'Meal deleted successfully!');
    }

    private function formatIngredients($ingredients)
    {
        return $ingredients->map(function ($ing) {
            return [
                'id' => $ing->id,
                'ing_name' => $ing->ing_name,
                'ing_type' => $ing->ing_type,
                'unit' => $ing->unit,
                'date_arrive' => $ing->date_arrive,
                'expiration_date' => $ing->expiration_date,
                'meal_name' => $ing->meal ? $ing->meal->name : 'N/A',
            ];
        });
    }

    private function formatMeals($meals)
    {
        return $meals->map(function ($meal) {
            return [
                'id' => $meal->id,
                'name' => $meal->name,
                'meal_tag' => $meal->meal_tag,
                'preparation_time' => $meal->preparation_time,
                'image_path' => $meal->image_path
                    ? url('private-meal-images/'.basename($meal->image_path))
                    : null,
                'org_name' => $meal->kitchenPartner ? $meal->kitchenPartner->org_name : 'N/A',
            ];
        });
    }

    public function servePrivateImage($filename)
    {
        $path = storage_path('app/private/meals/'.$filename);

        return response()->file($path);
    }
}
