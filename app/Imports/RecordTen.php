<?php

namespace App\Imports;

use App\Records;
use Maatwebsite\Excel\Concerns\ToModel;

class RecordTen implements ToModel
{
    public function model(array $row)
    {
        return new Records([
            'ICD-10 code' => $row[1],
            'ICD-10 code descriptor' => $row[2],
//            'Valid ICD-9-BPA code' => $row[3],
            'ICD-10-AM Map' => $row[3],
            'ICD-10-AM code descriptor' => $row[10],
        ]);
    }

}
