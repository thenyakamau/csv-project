<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\Client;

class RegisterController extends Controller
{
    //

    use IssueTokenTrait;

    private $client;

    public function __construct()
    {
        $this->client = Client::find(2);
        //Do your magic here
    }

    public function registerClient(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:4|confirmed',
        ]);

        $user = new User();
        $user->name = $request->name;
        $request->email = $request->email;
        $user->password = Hash::make($request->password);
        if ($user->save()) {
            $issueToken = json_decode($this->issueToken($request, 'password')->getContent());

            if (isset($issueToken->error)) {
                return response()->json($issueToken, 401);
            }
            return response()->json(['token' => $issueToken, 'user' => $user]);
        } else {
            return response()->json(['error' => 'Something went wrong'], 401);
        }
    }
}
