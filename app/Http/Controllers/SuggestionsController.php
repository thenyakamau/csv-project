<?php

namespace App\Http\Controllers;

use App\Exports\SuggestionExport;
use App\Exports\SuggestionTenExport;
use App\Suggestion;
use App\SuggestionTen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class SuggestionsController extends Controller
{
    //
    public function getSuggestions()
    {
        $suggestions = DB::table('suggestions')
            ->join('users', 'users.id', '=', 'suggestions.user_id')
            ->join('records', 'records.id', '=', 'suggestions.record_id')
            ->select('ICD-9-BPA code AS ic9code', 'ICD-9-BPA code description AS ic9description', 'ICD-10-AM 1st edition code map 1 AS ic10code', 'ICD-10-AM code description map 1 as ic10description', 'name', 'suggestions.*')
            ->get();

        $suggestionsAm = DB::table('suggestion_tens')
            ->join('users', 'users.id', '=', 'suggestion_tens.user_id')
            ->join('records_tens', 'records_tens.id', '=', 'suggestion_tens.record_id')
            ->select('ICD-10 code AS ic10code', 'ICD-10 code descriptor AS ic10description', 'ICD-10-AM Map AS ic10codeam', 'ICD-10-AM code descriptor as ic10amdescription', 'name', 'suggestion_tens.*')
            ->get();

        return view('admin', compact('suggestions', 'suggestionsAm'));
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
        $suggestion->record_id = $request->id;
        $suggestion->ic9descriptionsuggest = $request->ic9descriptionsuggest;
        $suggestion->ic10descriptionsuggest = $request->ic10descriptionsuggest;
        $suggestion->reason = $request->reason;

        if ($suggestion->save()) {
            return redirect()->back()->with(['success' => 'Suggestion has been submitted']);
        } else {
            return redirect()->back()->with(['message' => 'Something went wrong']);
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
        $suggestion->record_id = $request->id;
        $suggestion->ic10amdescriptionsuggest = $request->ic10amdescriptionsuggest;
        $suggestion->ic10descriptionsuggest = $request->ic10descriptionsuggest;
        $suggestion->reason = $request->reason;

        if ($suggestion->save()) {
            return redirect()->back()->with(['success' => 'Suggestion has been submitted']);
        } else {
            return redirect()->back()->with(['message' => 'Something went wrong']);
        }
    }

    public function deleteSuggestion($id)
    {
        $suggestion = Suggestion::findOrFail($id);
        if ($suggestion->delete()) {
            return redirect()->back()->with(['success' => 'Suggestion has been delete']);
        } else {
            return redirect()->back()->with(['message' => 'Something went wrong']);
        }
    }

    public function deleteSuggestionTen($id)
    {
        $suggestion = SuggestionTen::findOrFail($id);
        if ($suggestion->delete()) {
            return redirect()->back()->with(['success' => 'Suggestion has been delete']);
        } else {
            return redirect()->back()->with(['message' => 'Something went wrong']);
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
}
