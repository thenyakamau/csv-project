<?php

namespace App\Http\Controllers;

use App\Exports\RecordNineExport;
use App\Exports\RecordsExport;
use App\Exports\RecordTenExport;
use App\FileUpload;
use App\Imports\RecordNineImport;
use App\Imports\RecordsImport;
use App\Imports\RecordTen;
use App\RecordNine;
use App\Records;
use App\Suggestion;
use App\SuggestionNine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class RecordsController extends Controller
{
    //
    public function getRecords(Request $request)
    {
        if (isset($request->key)) {
            $records = DB::table('records')
                ->select('id', 'ICD-9-BPA code AS ic9code', 'ICD-9-BPA code description AS ic9description', 'ICD-10-AM 1st edition code map 1 AS ic10code', 'ICD-10-AM code description map 1 as ic10description')
                ->where($request->status, $request->key)
                ->Paginate();
        } else {
            $records = DB::table('records')
                ->select('id', 'ICD-9-BPA code AS ic9code', 'ICD-9-BPA code description AS ic9description', 'ICD-10-AM 1st edition code map 1 AS ic10code', 'ICD-10-AM code description map 1 as ic10description')
                ->where('Valid ICD-9-BPA code', 'Y')
                ->Paginate();
        }

        return response()->json(['records' => $records]);
    }

    public function fetchIc9to10Records(Request $request)
    {
        if (isset($request->key)) {
            $records = DB::table('record_nines')
                ->select('*')
                ->where($request->status, $request->key)
                ->Paginate();
        } else {
            $records = DB::table('record_nines')
                ->select('*')
                ->Paginate();
        }
        return response()->json(['records' => $records]);
    }

    public function getRecord(Request $request)
    {
        $record = DB::table('records')
            ->select('id', 'ICD-9-BPA code AS ic9code', 'ICD-9-BPA code description AS ic9description', 'ICD-10-AM 1st edition code map 1 AS ic10code', 'ICD-10-AM code description map 1 as ic10description')
            ->where('id', $request->id)
            ->get();

        return response()->json(['record' => $record]);
    }

    public function postRecord(Request $request)
    {
    }

    public function updateRecord(Request $request)
    {
        $record = Records::findOrFail($request->record_id);
        $suggestion = Suggestion::findOrFail($request->id);
        $voteCount = $record->votes;
        $usersCount = DB::table('users')->count();

        if ($voteCount < $usersCount){
            $record->votes = $voteCount +1;
            $record->save();
        }

        if (isset($request->ic9descriptionsuggest)) {
            $record->{'ICD-9-BPA code'} = $request->ic9codeinput;
            $record->{'ICD-9-BPA code description'} = $request->ic9descriptionsuggest;
        }

        if (isset($request->ic10descriptionsuggest)) {
            $record->{'ICD-10-AM 1st edition code map 1'} = $request->ic10codeinput;
            $record->{'ICD-10-AM code description map 1'} = $request->ic10descriptionsuggest;
        }

        $record->save();
        if ($suggestion->delete()) {
            return response()->json(['message' => 'Record has been updated']);
        } else {
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    public function updateRecordNine(Request $request)
    {
        $record = RecordNine::findOrFail($request->record_id);
        $suggestion = SuggestionNine::findOrFail($request->id);
        $voteCount = $record->votes;
        $usersCount = DB::table('users')->count();

        if ($voteCount < $usersCount){
            $record->votes = $voteCount +1;
            $record->save();
        }


        if (isset($request->ic9descriptionsuggest)) {
            $record->{'ICD9_Code'} = $request->ic9codeinput;
            $record->{'ICD9_Description'} = $request->ic9descriptionsuggest;
        }

        if (isset($request->ic10descriptionsuggest)) {
            $record->{'ICD10_Code'} = $request->ic10codeinput;
            $record->{'ICD10_Descriptiom'} = $request->ic10descriptionsuggest;
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
            'file' => 'required',
            'file_ic10' => 'required',
            'file_ic9' => 'required'
        ]);
        if ($request->hasFile('file')) {
            $fileUpload = new FileUpload();
            $fileUpload->file_name = $request->file('file')->store('/assets/uploads');
            $fileUpload->save();
            Excel::import(new RecordsImport, $fileUpload->file_name);
        }

        if ($request->hasFile('file_ic10')) {
            $fileUpload2 = new FileUpload();
            $fileUpload2->file_name = $request->file('file_ic10')->store('/assets/uploads');
            $fileUpload2->save();
            Excel::import(new RecordTen, $fileUpload2->file_name);
        }

        if ($request->hasFile('file_ic9')) {
            $fileUpload3 = new FileUpload();
            $fileUpload3->file_name = $request->file('file_ic9')->store('/assets/uploads');
            $fileUpload3->save();
            Excel::import(new RecordNineImport, $fileUpload3->file_name);
        }

        return response()->json(['message' => 'Files uploaded']);
    }

    public function exportRecords()
    {
        return Excel::download(new RecordsExport, 'records.csv');
    }

    public function exportRecordsNine()
    {
        return Excel::download(new RecordNineExport, 'records_nine.csv');
    }

    public function exportRecordsTen()
    {
        return Excel::download(new RecordTenExport, 'records_ten.csv');
    }
}
