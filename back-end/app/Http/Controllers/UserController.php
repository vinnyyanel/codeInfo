<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        if ($users->isEmpty()) {
            return response()->json(['message' => 'Aucun Utilisateur trouvé.'], 404);
        }
        return response()->json($users, 200);
    }

    public function store(Request $request)
    {
        $vli = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'photo' => 'required', // Vérifie que c'est une image et limite la taille
            'username' => 'required'
        ]);

        try {
            $chemin = $request->file('photo')->storeAs(
                'images/users',
                $request->email . '.' . $request->file('photo')->getClientOriginalExtension(),
                'public'
            );


            $photoUrl = Storage::url($chemin);

            User::create([
                'username' => $request->username,
                'email' => $request->email,
                'photoUrl' => $photoUrl,
                'password' => Hash::make($request->password), // Hash du mot de passe
            ]);

            Subscriber::create(['email'=>$request->email]);

            return response()->json(['message' => $vli], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erreur lors de l\'inscription', 'error' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable'], 404);
        }

        $request->validate([
            'email' => 'required|email',
            'username' => 'required|min:3|max:50',
            'photo' => 'nullable|image', // L'image est facultative
        ]);

        try {
            $photoUrl = $user->photoUrl;

            if ($request->hasFile('photo')) {
                // Suppression de l'ancienne image si une nouvelle est fournie
                Storage::disk('public')->delete($user->photoUrl);

                $chemin = $request->file('photo')->storeAs(
                    'images/users',
                    $request->email . '.' . $request->file('photoUrl')->getClientOriginalExtension(),
                    'public'
                );

                $photoUrl = Storage::url($chemin);
            }

            $user->update([
                'username' => $request->username,
                'email' => $request->email,
                'photoUrl' => $photoUrl,
            ]);

            return response()->json(['message' => 'Modification effectuée avec succès'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erreur lors de la mise à jour', 'error' => $th->getMessage()], 500);
        }
    }

    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable'], 404);
        }

        try {
            // Suppression de l'image
            Storage::disk('public')->delete($user->photoUrl);

            $user->delete();

            return response()->json(['message' => 'Utilisateur supprimé'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erreur lors de la suppression', 'error' => $th->getMessage()], 500);
        }
    }
}
