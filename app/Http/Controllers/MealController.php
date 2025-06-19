<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MealController extends Controller
{
    public function index()
    {
        $meals = Meal::all()->map(function ($meal) {
            return [
                'id' => $meal->id,
                'name' => $meal->name,
                'prepared_by' => $meal->prepared_by,
                'preparation_time' => $meal->preparation_time,
                'meal_tag' => $meal->meal_tag,
                'image_path' => $meal->image_path ? asset('storage/'.$meal->image_path) : null,
            ];
        });

        return Inertia::render('Admin/Meals', [
            'meals' => $meals,
        ]);
    }

    public function store(Request $request)
    {
        logger($request->all());

        $validated = $request->validate([
            'name' => 'required|string',
            'meal_tag' => 'required|string',
            'prepared_by' => 'required|string',
            'preparation_time' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('meals', 'public');
        }

        Meal::create([
            'name' => $validated['name'],
            'meal_tag' => $validated['meal_tag'],
            'prepared_by' => $validated['prepared_by'],
            'preparation_time' => $validated['preparation_time'],
            'image_path' => $path,
        ]);

        return redirect()->back()->with('success', 'Meal added!');
    }

    public function update(Request $request, $id) {
        $meal = Meal::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string',
            'meal_tag' => 'required|string',
            'prepared_by' => 'required|string',
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
            'prepared_by' => $validated['prepared_by'],
            'preparation_time' => $validated['preparation_time']
        ]);

    return redirect()->back()->with('success', 'Meal updated successfully!');
}

    public function destroy(Meal $meal)
    {
        $meal->delete();

        return redirect(url('/admin/meals'))
            ->with('success', 'Meal deleted!');
    }
}
