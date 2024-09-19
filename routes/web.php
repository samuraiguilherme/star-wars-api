<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\AutocompleteController;
use App\Http\Controllers\EntityController;
use App\Http\Controllers\PeopleController;
use App\Http\Controllers\FilmsController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])
    ->name('home');

Route::get('/autocomplete/{entity}', [AutocompleteController::class, 'index']);

Route::get('/films/{id}', [FilmsController::class, 'show'])
    ->name('films.show');

Route::get('/people/{id}', [PeopleController::class, 'show'])
    ->name('people.show');
