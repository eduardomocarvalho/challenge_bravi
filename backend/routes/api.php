<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\ContactController;

// Rotas para CRUD de pessoas
Route::get('people', [PersonController::class, 'index']); // Obter todas as pessoas
Route::get('people/{id}', [PersonController::class, 'show']); // Obter uma pessoa específica
Route::post('people', [PersonController::class, 'store']); // Criar uma nova pessoa
Route::put('people/{id}', [PersonController::class, 'update']); // Atualizar uma pessoa
Route::delete('people/{id}', [PersonController::class, 'destroy']); // Excluir uma pessoa
