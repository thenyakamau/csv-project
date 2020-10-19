<?php

namespace App\Http\Controllers;

use App\Exports\SuggestionExport;
use App\Exports\SuggestionTenExport;
use App\Exports\SuggestNineExport;
use App\RecordNine;
use App\Records;
use App\RecordsTen;
use App\Suggestion;
use App\SuggestionNine;
use App\SuggestionTen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class SuggestionsController extends Controller
{
    public function getAllUsers()
    {
        $usersCount = DB::table('users')->count();
        return response().json(['totalVotes'=>$usersCount]);
    }

    public function getSuggestions(Request $request)
    {
        // $suggestions = Suggestion::paginate(10);

        $suggestions = DB::table('suggestions')->join('records','records.id','suggestions.record_id')->select('suggestions.*','records.vote')->orderBy($request->sort, 'desc')->paginate(10);

        return response()->json(['suggestion' => $suggestions]);
    }

    public function getSuggestionsNine(Request $request)
    {
        // $suggestions = SuggestionNine::paginate(10);
        $suggestions = DB::table('suggestions')->orderBy($request->sort, 'desc')->paginate(10);
        return response()->json(['suggestion' => $suggestions]);
    }

    public function getSuggestionsTen(Request $request)
    {
        // $suggestions = SuggestionTen::paginate(10);
        $suggestions = DB::table('suggestions')->orderBy($request->sort, 'desc')->paginate(10);
        return response()->json(['suggestion' => $suggestions]);
    }

    public function postSuggestions(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'ic9descriptionsuggest' => 'required',
            'ic10descriptionsuggest' => 'required',
        ]);

        $suggestion = new Suggestion();
        $suggestion->user_id = Auth::user()->id;
        $suggestion->name = Auth::user()->name;
        $suggestion->record_id = $request->id;
        $suggestion->ic9code = $request->ic9code;
        $suggestion->ic9codeinput = $request->ic9codeinput;
        $suggestion->ic9description = $request->ic9description;
        $suggestion->ic9descriptionsuggest = $request->ic9descriptionsuggest;
        $suggestion->ic10code = $request->ic10code;
        $suggestion->ic10codeinput = $request->ic10codeinput;
        $suggestion->ic10description = $request->ic10description;
        $suggestion->ic10descriptionsuggest = $request->ic10descriptionsuggest;
        $suggestion->reason = $request->reason;

//        $record = Records::where('id',$request->id)->first();
        $record = DB::table('records')->where('id',$request->id);
        $voteCount = Records::where('vote',$request->id)->first();
        $usersCount = DB::table('users')->count();

        $votes = Records::where('vote',$request->id)->first() + 1;
        $record->update(['vote'=>$votes]);


        RecordNine::find($request->id)->increment('vote',5);
//        if ($voteCount < $usersCount){
//            $voteCount = ++$voteCount;
//            $record->vote = ++$voteCount;
//            $record->save();
//        }

        if ($suggestion->save()) {
            return response()->json(['message' => 'Suggestion has been submitted']);
        } else {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    public function postAmSuggestions(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'ic10descriptionsuggest' => 'required',
            'ic10amdescriptionsuggest' => 'required',
        ]);

        $suggestion = new SuggestionTen();
        $suggestion->user_id = Auth::user()->id;
        $suggestion->name = Auth::user()->name;
        $suggestion->record_id = $request->id;
        $suggestion->ic10amcode = $request->ic10amcode;
        $suggestion->ic10amcodeinput = $request->ic10amcodeinput;
        $suggestion->ic10amdescription = $request->ic10amdescription;
        $suggestion->ic10amdescriptionsuggest = $request->ic10amdescriptionsuggest;
        $suggestion->ic10code = $request->ic10code;
        $suggestion->ic10codeinput = $request->ic10codeinput;
        $suggestion->ic10description = $request->ic10description;
        $suggestion->ic10descriptionsuggest = $request->ic10descriptionsuggest;
        $suggestion->reason = $request->reason;

//        $record = RecordsTen::where('id',$request->id)->first();
        $record = DB::table('record_tens')->where('id',$request->id);
        $voteCount = RecordsTen::where('vote',$request->id)->first();
        $usersCount = DB::table('users')->count();

        $votes = RecordsTen::where('vote',$request->id)->first() + 1;
        $record->update(['vote'=>$votes]);
        RecordsTen::find($request->id)->increment('vote',1);

//        if ($voteCount < $usersCount){
//            $voteCount = ++$voteCount;
//            $record->vote = ++$voteCount;
//            $record->save();
//        }

        if ($suggestion->save()) {
            return response()->json(['message' => 'Suggestion has been submitted']);
        } else {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    public function post10Suggestion(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'ic9descriptionsuggest' => 'required',
            'ic10descriptionsuggest' => 'required',
        ]);

        $suggestion = new SuggestionNine();
        $suggestion->user_id = Auth::user()->id;
        $suggestion->name = Auth::user()->name;
        $suggestion->record_id = $request->id;
        $suggestion->ic9code = $request->ic9code;
        $suggestion->ic9codeinput = $request->ic9codeinput;
        $suggestion->ic9description = $request->ic9description;
        $suggestion->ic9descriptionsuggest = $request->ic9descriptionsuggest;
        $suggestion->ic10code = $request->ic10code;
        $suggestion->ic10codeinput = $request->ic10codeinput;
        $suggestion->ic10description = $request->ic10description;
        $suggestion->ic10descriptionsuggest = $request->ic10descriptionsuggest;
        $suggestion->reason = $request->reason;

//        $record = RecordNine::where('id',$request->id)->first();
        $record = DB::table('records_nine')->where('id',$request->id);
        $voteCount = RecordNine::where('vote',$request->id)->first();
        $usersCount = DB::table('users')->count();

        $votes = RecordNine::where('vote',$request->id)->first() + 1;
        $record->update(['vote'=>$votes]);

        RecordNine::find($request->id)->increment('vote',1);

//        if ($voteCount < $usersCount){
//            $voteCount = ++$voteCount;
//            $record->votes = ++$voteCount;
//            $record->save();
//        }

        if ($suggestion->save()) {
            return response()->json(['message' => 'Suggestion has been submitted']);
        } else {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    public function deleteSuggestion(Request $request)
    {
        $suggestion = Suggestion::findOrFail($request->id);
        if ($suggestion->delete()) {
            return response()->json(['message' => 'Suggestion has been delete']);
        } else {
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    public function deleteSuggestionTen(Request $request)
    {
        $suggestion = SuggestionTen::findOrFail($request->id);
        if ($suggestion->delete()) {
            return response()->json(['message' => 'Suggestion has been delete']);
        } else {
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    public function deleteSuggestionNine(Request $request)
    {
        $suggestion = SuggestionNine::findOrFail($request->id);
        if ($suggestion->delete()) {
            return response()->json(['message' => 'Suggestion has been delete']);
        } else {
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    public function getSuggestionsExport()
    {
        return Excel::download(new SuggestionExport, 'suggestions.csv');
    }

    public function getSuggestionsTenExport()
    {
        return Excel::download(new SuggestionTenExport, 'suggestions_ten.csv');
    }
    public function getSuggestionsNineExport()
    {
        return Excel::download(new SuggestNineExport, 'suggestions_nine.csv');
    }
}
