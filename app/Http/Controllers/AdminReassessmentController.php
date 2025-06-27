<?php

namespace App\Http\Controllers;

use App\Models\Reassessment;
use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminReassessmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Reassessments/Index', [
            'reassessments' => Reassessment::with('member')->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Reassessments/Create', [
            'members' => Member::select('id', 'first_name', 'last_name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'member_id' => 'required|exists:members,id',
            'assessment_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        Reassessment::create($request->only(['member_id', 'assessment_date', 'notes']));

        return redirect()->route('admin.reassessments.index')->with('success', 'Reassessment created successfully.');
    }

    public function edit(Reassessment $reassessment)
    {
        return Inertia::render('Admin/Reassessments/Edit', [
            'reassessment' => $reassessment->load('member'),
            'members' => Member::select('id', 'first_name', 'last_name')->get(),
        ]);
    }

    public function update(Request $request, Reassessment $reassessment)
    {
        $request->validate([
            'member_id' => 'required|exists:members,id',
            'assessment_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $reassessment->update($request->only(['member_id', 'assessment_date', 'notes']));

        return redirect()->route('admin.reassessments.index')->with('success', 'Reassessment updated successfully.');
    }

    public function destroy(Reassessment $reassessment)
    {
        $reassessment->delete();

        return redirect()->route('admin.reassessments.index')->with('success', 'Reassessment deleted successfully.');
    }
}

