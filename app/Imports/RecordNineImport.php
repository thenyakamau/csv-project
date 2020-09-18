<?php

namespace App\Imports;

use App\RecordNine;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Validators\Failure;

class RecordNineImport implements ToModel, WithStartRow, SkipsOnFailure
{

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new RecordNine([
            'ICD9_Code' => $row[1],
            'ICD9_Description' => $row[3],
            'ICD10_Code' => $row[2],
            'ICD10_Descriptiom' => $row[4],
        ]);
    }

    /**
     * @return int
     */
    public function startRow(): int
    {
        return 2;
    }

    /**
     * @param Failure[] $failures
     */
    public function onFailure(Failure ...$failures)
    {
        // Handle the failures how you'd like.
    }
}
