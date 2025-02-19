<?php

namespace App\Http\Controllers;

use App\Jobs\SendNewsletterJob;
use App\Models\Post;
use App\Models\Subscriber;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->paginate(4);
        if ($posts->isEmpty()) {
            return response()->json(['message' => 'Aucun post trouvé.'], 404);
        }
        return response()->json($posts, 200);
    }

    public function getPostUserCommentsUsers($id)
    {
        // Récupérer le post avec les commentaires et les utilisateurs des commentaires
        $post = Post::with('comments.user')->findOrFail($id);

        // Retourner la vue avec les données
        return view('post.show', compact('post'));
    }
    public function getComments($postId)
    {
        // Récupérer les commentaires du post avec les utilisateurs associés
        $comments = Post::findOrFail($postId)
                        ->comments()
                        ->with('user')  // Charger les utilisateurs des commentaires
                        ->get();

        // Retourner les commentaires au format JSON
        return response()->json($comments);
    }

    public function getPostComments($id)
    {
        $post = Post::with('comments')->find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        return response()->json([
            'post' => $post,
            'comments' => $post->comments
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required',
            'description' => 'required',
            'user_id' => 'required',
        ]);

        try {
            $post = Post::create($validated);
            SendNewsletterJob::dispatch($post->titre,$post->id);
            $tes=Subscriber::create(['email'=>'ired']);
            return response()->json(['message' => 'Post publier!!!.'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Échec de l’enregistrement.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::with('user')->findOrFail($id);
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
