<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/images/proofs/{file}', function (string $file) {
    $disk = Storage::disk('local');
    $path = 'proofs/'.$file;
    if (! Storage::disk('local')->exists($path)) {
        return response()->json(['message' => 'Not Found'], 404);
    }

    return response()->file($disk->path($path));
});

Route::get('/images/medicals/{file}', function (string $file) {
    $disk = Storage::disk('local');
    $path = 'medicals/'.$file;
    if (! Storage::disk('local')->exists($path)) {
        return response()->json(['message' => 'Not Found'], 404);
    }

    return response()->file($disk->path($path));
});
