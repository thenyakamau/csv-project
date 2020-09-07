<?php

namespace App\Http\Controllers;

use App\FileUpload;
use App\Imports\RecordsImport;
use App\Records;
use App\Suggestion;
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
                ->where($request->status, 'like', '%' . $request->key . '%')
                ->Paginate();
        } else {
            $records = DB::table('records')
                ->select('id', 'ICD-9-BPA code AS ic9code', 'ICD-9-BPA code description AS ic9description', 'ICD-10-AM 1st edition code map 1 AS ic10code', 'ICD-10-AM code description map 1 as ic10description')
                ->where('Valid ICD-9-BPA code', 'Y')
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
        if (isset($request->ic9descriptionsuggest)) {
            $record->{'ICD-9-BPA code description'} = $request->ic9descriptionsuggest;
        }

        if (isset($request->ic10descriptionsuggest)) {
            $record->{'ICD-10-AM code description map 1'} = $request->ic10descriptionsuggest;
        }

        $record->save();
        if ($suggestion->delete()) {
            return redirect()->back()->with(['success' => 'Record has been updated']);
        } else {
            return redirect()->back()->with(['message' => 'Something went wrong']);
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

        Excel::import(new RecordsImport, $fileUpload->file_name);

        return redirect()->route('welcome');
    }
}
