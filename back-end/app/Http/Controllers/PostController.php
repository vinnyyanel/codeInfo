<?php

namespace App\Http\Controllers;

use App\Jobs\SendNewsletterJob;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all(['id', 'titre', 'description', 'user_id']);
        if ($posts->isEmpty()) {
            return response()->json(['message' => 'Aucun post trouvé.'], 404);
        }
        return response()->json($posts, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string',
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        try {
            $post = Post::create($validated);
            SendNewsletterJob::dispatch($post->titre);
            return response()->json(['message' => 'Enregistrement réussi.'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Échec de l’enregistrement.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post introuvable.'], 404);
        }
        return response()->json($post, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'titre' => 'required|string',
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post introuvable.'], 404);
        }

        $post->update($validated);
        return response()->json(['message' => 'Modification effectuée avec succès.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post introuvable.'], 404);
        }

        $post->delete();
        return response()->json(['message' => 'Post supprimé avec succès.'], 200);
    }
}
