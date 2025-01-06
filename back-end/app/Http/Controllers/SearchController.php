<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(string $slug){
        try {
            $posts = Post::where('titre','LIKE',"%{$slug}%")->get();

            return response()->json($posts);
        } catch (\Throwable $th) {
            return response()->json(['error'=>'aucun utilisateur non trouvé'], 400);
        }
    }
}
