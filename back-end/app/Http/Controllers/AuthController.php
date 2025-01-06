<?php

namespace App\Http\Controllers;

use App\Mail\NewsletterMail;
use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email'=>'required|email',
            'password'=>'required',
        ]);

        $user = User::where('email',$request->email)->first();
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message'=>'email incorrect ou mot de passe'], 400);
        }

        $token = $user->createToken('ApiToken')->plainTextToken;
        return response()->json(['token'=>$token,'user'=>$user], 200);
    }

    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($request->only('email'));

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Email de réinitialisation envoyé.'], 200);
        }

        return response()->json(['message' => 'Impossible d’envoyer l’email de réinitialisation.'], 400);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Mot de passe réinitialisé avec succès.'], 200);
        }

        return response()->json(['message' => 'La réinitialisation du mot de passe a échoué.'], 400);
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'deconnexion reussie'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'erreur lors de la deconnection','exeption'=>$th], 400);
        }
    }

}
