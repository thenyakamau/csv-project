@extends('layouts.app') 

@section('content')

<div class="container">
    <div class="search_bar">
        <select class="form-control drop_down_items" id="category-selector">
            <option value="ICD-9-BPA code">ICD-9 -> ICD-10AM</option>
            <option value="ICD-10-AM 1st edition code map 1">ICD-10AM -> ICD-9</option>
            <option value="ICD9_Code">ICD-9 -> ICD-10</option>
            <option value="ICD10_Code">ICD-10 -> ICD-9</option>
            <option value="ICD-10 code">ICD-10 -> ICD-10AM</option>
            <option value="ICD-10-AM Map">ICD-10AM -> ICD-10</option>
          </select>

        <input type="text" class="form-group" id='search-bar' placeholder="Input code and press search....">
        <div class="card searh_button" id='search_button'>
            <div class="search_button_items">
                <i class="fas fa-search"></i>
                <label>Search</label>
            </div>
        </div>

    </div>
    <div class="card">
        <div class="card-header">Search Tips</div>
        <div class="card-body">
            Use the switch on the the search box to toggle between ICD-9 and ICD-10 codes. You may type the entire code or a fraction of the code into the search box for results. The initial data is to give a concept of how the data should seem plus dummy searches.
        </div>
    </div>

    <div class="card mt-4">
        <div class="card-header records_header">

            <h4>Records</h4>
            <a href="/exportRecords" class="btn btn-primary" id="record_link_download">Download</a>
            <a href="/exportRecordsNine" class="btn btn-primary display_none" id="record_nine_link_download">Download</a>
            <a href="/exportRecordsTen" class="btn btn-primary display_none" id="record_ten_link_download">Download</a>
        </div>
        <div class="card-body">
            <div id='record-table'>
                <table class="table table-striped table-responsive w-100 d-block d-md-table display_none">
                    <thead id="table-ic-head"></thead>
                    <tbody id="record-list"></tbody>
                </table>
            </div>

            <div id='record-ten-table'>
                <table class="table table-striped table-responsive record_ten_table w-100 d-block d-md-table">
                    <thead id="table-ic10-head"></thead>
                    <tbody id="record-ten-list"></tbody>
                </table>
            </div>

        </div>
    </div>
</div>
</div>
@endsection