<?php

namespace App\Http\Controllers;

use App\Exports\SuggestionExport;
use App\Suggestion;
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

        // return response()->json(['suggestions' => $suggestions]);
        return view('admin', compact('suggestions'));
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

    public function deleteSuggestion($id)
    {
        $suggestion = Suggestion::findOrFail($id);
        if ($suggestion->delete()) {
            return redirect()->back()->with(['success' => 'Suggestion has been delete Refresh']);
        } else {
            return redirect()->back()->with(['message' => 'Something went wrong']);
        }
    }

    public function getSuggestionsExport()
    {
        return Excel::download(new SuggestionExport, 'suggestions.xlsx');
    }
}
