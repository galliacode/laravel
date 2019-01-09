<?php

namespace App\Http\Controllers\Twitter;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\Controller;
use App\Models\Twitter\Channel;

class ChannelController extends Controller
{

    public function add(Request $request){
        
        $accessToken = $request->input("oauth_token");
        $accessTokenSecret = $request->input("oauth_token_secret");

        $credentials = Socialite::driver("twitter")->userFromTokenAndSecret($accessToken, $accessTokenSecret);

        if(is_object($credentials) && !isset($credentials->error)){

            $token = [
                "oauth_token" => $credentials->token,
                "oauth_token_secret" => $credentials->tokenSecret
            ];

            $user = auth()->user();
            $existingChannel = Channel::where("username", $credentials->nickname)->first();
    
            if(!$existingChannel){
                $channel = $user->channels()->create(["type" => "twitter"]);
                $twitterChannel = $channel->details()->create([
                "user_id" => $user->id, 
                "username" => $credentials->nickname, 
                "payload" => serialize($credentials), 
                "access_token" => json_encode($token)]);
    
                $channel->select();
                $twitterChannel->select();
    
                /*
                 * Sync following and followers in the background
                 */
                multiRequest(route("sync.follower.ids"), [$twitterChannel], ["sleep" => 0]);
                multiRequest(route("sync.following.ids"), [$twitterChannel], ["sleep" => 0]);
            }else{

                if($existingChannel->user_id == $user->id){
                    $global = $existingChannel->global;
                    $global->active = 1;
                    $global->save();
                    $twitterChannel = $existingChannel;
                    $twitterChannel->access_token = json_encode($token);
                    $twitterChannel->save();
                }else{
                    return response()->json(['error' => 'Channel already exists with some other account'], 400);
                }

            }

            return $user->formattedChannels();
        }

        return response()->json(['error' => 'Channel could not be authenticated with twitter'], 403);
    }

    public function select($id)
    {
        $user = auth()->user();
        $channel = $user->channels()->find($id);

        if($channel){
            $channel->select();
            $channel->details->select();
        }

        return $user->formattedChannels();
    }

}
