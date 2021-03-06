<?php

namespace App\Http\Controllers;

use App\Exports\SuggestionExport;
use App\Exports\SuggestionTenExport;
use App\Exports\SuggestNineExport;
use App\Suggestion;
use App\SuggestionNine;
use App\SuggestionTen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class SuggestionsController extends Controller
{
    //
    public function getSuggestions()
    {
        $suggestions = Suggestion::get();
        $suggestionsAm = SuggestionTen::get();
        $suggestions10 = SuggestionNine::get();

        return view('admin', compact('suggestions', 'suggestionsAm', 'suggestions10'));
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
        $suggestion->ic9description = $request->ic9description;
        $suggestion->ic9descriptionsuggest = $request->ic9descriptionsuggest;
        $suggestion->ic10code = $request->ic10code;
        $suggestion->ic10description = $request->ic10description;
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
        $suggestion->name = Auth::user()->name;
        $suggestion->record_id = $request->id;
        $suggestion->ic10amcode = $request->ic10amcode;
        $suggestion->ic10amdescription = $request->ic10amdescription;
        $suggestion->ic10amdescriptionsuggest = $request->ic10amdescriptionsuggest;
        $suggestion->ic10code = $request->ic10code;
        $suggestion->ic10description = $request->ic10description;
        $suggestion->ic10descriptionsuggest = $request->ic10descriptionsuggest;
        $suggestion->reason = $request->reason;

        if ($suggestion->save()) {
            return redirect()->back()->with(['success' => 'Suggestion has been submitted']);
        } else {
            return redirect()->back()->with(['message' => 'Something went wrong']);
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
        $suggestion->ic9description = $request->ic9description;
        $suggestion->ic9descriptionsuggest = $request->ic9descriptionsuggest;
        $suggestion->ic10code = $request->ic10code;
        $suggestion->ic10description = $request->ic10description;
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

    public function deleteSuggestionNine($id)
    {
        $suggestion = SuggestionNine::findOrFail($id);
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
    public function getSuggestionsNineExport()
    {
        return Excel::download(new SuggestNineExport, 'suggestions_nine.csv');
    }
}
