<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(string $query)
    {
        try {
            $posts = Post::with('user')
            ->whereRaw('LOWER(titre) LIKE ?', ['%' . strtolower($query) . '%'])
            ->get();
            return response()->json([
                'posts' => $posts
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Une erreur s\'est produite lors de la recherche.',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
