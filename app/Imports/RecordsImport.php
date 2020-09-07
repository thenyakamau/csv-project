<?php

namespace App\Imports;

use App\Records;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;

class RecordsImport implements ToModel, WithStartRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Records([
            'ICD-9-BPA code' => $row[1],
            'ICD-9-BPA code description' => $row[2],
            'Valid ICD-9-BPA code' => $row[3],
            'ICD-10-AM 1st edition code map 1' => $row[4],
            'ICD-10-AM code description map 1' => $row[10],
        ]);
    }

    /**
     * @return int
     */
    public function startRow(): int
    {
        return 3;
    }
}
