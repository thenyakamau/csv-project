<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\Client;

class LoginController extends Controller
{
    //
    use IssueTokenTrait;

    private $client;

    public function __construct()
    {
        $this->client = Client::find(2);
    }

    public function login(Request $request)
    {
        $this->validate($request, [

            'username' => 'required',
            'password' => 'required'

        ]);

        // return $this->issueToken($request, 'password');
        if (Auth::attempt(['email' => $request->username, 'password' => $request->password])) {
            $user = User::where('email', $request->username)->first();
            $issueToken = json_decode($this->issueToken($request, 'password')->getContent());

            if (isset($issueToken->error)) {
                return response()->json($issueToken, 401);
            }
        } else {
            return response()->json(['error' => 'Authentication details do not match'], 401);
        }

        return response()->json(['token' => $issueToken, 'user' => $user]);
    }

    public function refresh(Request $request)
    {
        $this->validate($request, [

            'refresh_token' => 'required'

        ]);

        return $this->issueToken($request, 'refresh_token');
    }

    public function logout(Request $request)
    {
        $accessToken = Auth::user()->token();

        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update(['revoked' => true]);

        $accessToken->revoke();

        return response()->json(["message" => "logged out"]);
    }
}
