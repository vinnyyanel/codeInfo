<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::all(['id', 'comment', 'statut', 'post_id', 'user_id']);
        if ($comments->isEmpty()) {
            return response()->json(['message' => 'Aucun commentaire trouvé.'], 404);
        }
        return response()->json($comments, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'comment' => 'required|string',
            'statut' => 'required|string',
            'post_id' => 'required|exists:posts,id',
            'user_id' => 'required|exists:users,id',
        ]);

        try {
            Comment::create($validated);
            return response()->json(['message' => 'Commentaire enregistré avec succès.'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Échec de l’enregistrement.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json(['message' => 'Commentaire introuvable.'], 404);
        }
        return response()->json($comment, 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'comment' => 'required|string',
            'statut' => 'required|string',
            'post_id' => 'required|exists:posts,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json(['message' => 'Commentaire introuvable.'], 404);
        }

        $comment->update($validated);
        return response()->json(['message' => 'Commentaire modifié avec succès.'], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json(['message' => 'Commentaire introuvable.'], 404);
        }

        $comment->delete();
        return response()->json(['message' => 'Commentaire supprimé avec succès.'], 200);
    }

}
