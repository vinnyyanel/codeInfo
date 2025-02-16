<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\UserController;


Route::get('et',[PostController::class, 'teste']);

Route::prefix('subscribers')->group(function () {        // Récupérer tous les abonnés a la newlester
    Route::post('/', [SubscriberController::class, 'store']);        // Créer un nouveau abonné
   });

Route::prefix('posts')->group(function () {
    Route::get('/', [PostController::class, 'index']);
    Route::get('/{id}', [PostController::class, 'show']);
    Route::get('/{id}/comments', [PostController::class, 'getComments']);
});

Route::prefix('search')->group(function () {
    Route::get('/{query}', [SearchController::class, 'search']);            // Réchercher les posts
   });

   Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);            // Récupérer tous les utilisateurs
    Route::post('/', [UserController::class, 'store']); });

Route::middleware('guest')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::put('/reset-password', [UserController::class, 'reset']);
        Route::post('/forgot-password', [AuthController::class, 'sendResetLink']);
    });
});


Route::middleware('auth:sanctum')->group(function () {
  Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    Route::prefix('comments')->group(function () {
        Route::get('/', [CommentController::class, 'index']);         // Récupérer tous les commentaires
        Route::post('/', [CommentController::class, 'store']);        // Créer un nouveau commentaire
        Route::get('/{id}', [CommentController::class, 'show']);      // Récupérer un commentaire spécifique
        Route::put('/{id}', [CommentController::class, 'update']);    // Mettre à jour un commentaire
        Route::delete('/{id}', [CommentController::class, 'destroy']);// Supprimer un commentaire
    });

    Route::prefix('posts')->group(function () {           // Récupérer tous les posts
        Route::post('/', [PostController::class, 'store']);           // Créer un nouveau post
                // Récupérer un post spécifique
                Route::get('/t',[PostController::class, 'teste']);
        Route::put('/{id}', [PostController::class, 'update']);       // Mettre à jour un post
        Route::delete('/{id}', [PostController::class, 'destroy']);   // Supprimer un post
      //  Route::get('/{id}/comments', [PostController::class, 'comments']); // Récupérer les commentaires d'un post
    });

    Route::prefix('users')->group(function () {          // Créer un nouvel utilisateur
        Route::get('/{id}', [UserController::class, 'show']);         // Récupérer un utilisateur spécifique
        Route::put('/{id}', [UserController::class, 'update']);       // Mettre à jour un utilisateur
        Route::delete('/{id}', [UserController::class, 'destroy']);   // Supprimer un utilisateur
    });

}
)
;
