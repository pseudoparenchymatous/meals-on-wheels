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
                'title' => $meal->title,
                'prepared_by' => $meal->prepared_by,
                'preparation_time' => $meal->preparation_time,
                'meal_type' => $meal->meal_type,
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
            'title' => 'required|string',
            'meal_type' => 'required|string',
            'prepared_by' => 'required|string',
            'preparation_time' => 'required|numeric',
            'image' => 'nullable|image|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('meals', 'public');
        }

        Meal::create([
            'title' => $validated['title'],
            'meal_type' => $validated['meal_type'],
            'prepared_by' => $validated['prepared_by'],
            'preparation_time' => $validated['preparation_time'],
            'image_path' => $path,
        ]);

        return redirect()->back()->with('success', 'Meal added!');
    }

    public function update(Request $request, $id)
    {
        $meal = Meal::findOrFail($id);
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('meals', 'public');
            $meal->image_path = $path;
        }

        $meal->update($request->only(['title', 'meal_type', 'prepared_by', 'preparation_time']));

        return response()->json($meal);
    }

    public function destroy(Meal $meal)
    {
        $meal->delete();

        return redirect(url('/admin/meals'))
            ->with('success', 'Meal deleted!');
    }
}
