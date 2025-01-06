<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function index()
    {
        $subscribers = Subscriber::all(['id', 'email']); // Ajoute les champs pertinents pour un abonné
        if ($subscribers->isEmpty()) {
            return response()->json(['message' => 'Aucun abonné trouvé.'], 404);
        }
        return response()->json($subscribers, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email' // Assurer que l'email est unique
        ]);

        try {

            Subscriber::create($validated);
            return response()->json(['message' => 'Abonné enregistré avec succès.'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Échec de l’enregistrement.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $subscriber = Subscriber::find($id);
        if (!$subscriber) {
            return response()->json(['message' => 'Abonné introuvable.'], 404);
        }
        return response()->json($subscriber, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'email' => 'required|email' // Assurer que l'email est unique sauf pour cet abonné
        ]);

        $subscriber = Subscriber::find($id);
        if (!$subscriber) {
            return response()->json(['message' => 'Abonné introuvable.'], 404);
        }

        $subscriber->update($validated);
        return response()->json(['message' => 'Abonné modifié avec succès.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $subscriber = Subscriber::find($id);
        if (!$subscriber) {
            return response()->json(['message' => 'Abonné introuvable.'], 404);
        }

        $subscriber->delete();
        return response()->json(['message' => 'Abonné supprimé avec succès.'], 200);
    }

}
