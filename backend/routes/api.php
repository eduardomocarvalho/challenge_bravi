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

// Rotas para CRUD de contatos
Route::get('contacts', [ContactController::class, 'index']); // Obter todos os contatos
Route::get('contacts/{id}', [ContactController::class, 'show']); // Obter um contato específico
Route::post('contacts', [ContactController::class, 'store']); // Criar um novo contato
Route::put('contacts/{id}', [ContactController::class, 'update']); // Atualizar um contato
Route::delete('contacts/{id}', [ContactController::class, 'destroy']); // Excluir um contato
