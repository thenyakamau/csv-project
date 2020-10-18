<?php

namespace App\Http\Controllers;

use App\Imports\RecordTen;
use App\FileUpload;
use App\Records;
use App\RecordsTen;
use App\Suggestion;
use App\SuggestionTen;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class RecordsTenController extends Controller
{
    public function getRecordsTen(Request $request)
    {
        if (isset($request->key)) {
            $records = DB::table('records_tens')
                ->select('id', 'ICD-10 code AS ic10code', 'ICD-10 code descriptor AS ic10description', 'ICD-10-AM Map AS ic10codeam', 'ICD-10-AM code descriptor as ic10amdescription')
                ->where($request->status, $request->key)
                ->Paginate();
        } else {
            $records = DB::table('records_tens')
                ->select('id', 'ICD-10 code AS ic10code', 'ICD-10 code descriptor AS ic10description', 'ICD-10-AM Map AS ic10codeam', 'ICD-10-AM code descriptor as ic10amdescription')
                ->Paginate();
        }

        return response()->json(['records' => $records]);
    }

    public function getRecordTen(Request $request)
    {
        $record = DB::table('records_tens')
            ->select('id', 'ICD-10 code AS ic10code', 'ICD-10 code descriptor AS ic10description', 'ICD-10-AM Map AS ic10codeam', 'ICD-10-AM code descriptor as ic10amdescription')
            ->where('id', $request->id)
            ->get();

        return response()->json(['record' => $record]);
    }

    public function postRecord(Request $request)
    {
    }

    public function updateRecordTen(Request $request)
    {
        $record = RecordsTen::findOrFail($request->record_id);
        $suggestion = SuggestionTen::findOrFail($request->id);
        $voteCount = $record->votes;
        $usersCount = DB::table('users')->count();

        if ($voteCount < $usersCount){
            $record->votes = $voteCount +1;
            $record->save();
        }

        if (isset($request->ic10descriptionsuggest)) {
            $record->{'ICD-10 code'} = $request->ic10codeinput;
            $record->{'ICD-10 code descriptor'} = $request->ic10descriptionsuggest;
        }

        if (isset($request->ic10amdescription)) {
            $record->{'ICD-10-AM Map'} = $request->ic10amcodeinput;
            $record->{'ICD-10-AM code descriptor'} = $request->ic10amdescriptionsuggest;
        }

        $record->save();
        if ($suggestion->delete()) {
            return response()->json(['message' => 'Record has been updated']);
        } else {
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    public function importExcel(Request $request)
    {
        $this->validate($request, [
            'file' => 'required'
        ]);

        $fileUpload = new FileUpload();
        $fileUpload->file_name = $request->file('file')->store('/assets/uploads');
        $fileUpload->save();

        Excel::import(new RecordTen, $fileUpload->file_name);

        return redirect()->route('welcome');
    }
}
