@extends('layouts.app')

@section('content')

    <div class="container mt-4">
        @if (session('success'))
        <div data-form-alert="true">
            <div
              data-form-alert-success="true"
              class="alert alert-form alert-success text-xs-center"
            >
            {{session('success')}}
            </div>
          </div>
        @else
        <div data-form-alert="true">
            <div
              data-form-alert-success="true"
              class="alert alert-form alert-warning text-xs-center"
            >
            {{session('message')}}
            </div>
          </div>
        @endif
      <div class="search_bar">
          <div class="card drop_down" id="drop_down_id">
           
                <select class="form-control drop_down_items" id="category-selector">
                  <option value="ICD-9-BPA code">ICD-9 -> ICD-10AM</option>
                  <option value="ICD-10-AM 1st edition code map 1">ICD-10AM -> ICD-9</option>
                </select>
            
          </div>
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
            Use the switch on the the search box to toggle between ICD-9 and ICD-10 codes. 
            You may type the entire code or a fraction of the code into the search box for results. 
            The initial data is to give a concept of how the data should seem plus dummy searches.
          </div>
    </div>

    <div class="card mt-4">
        <div class="card-header records_header">
            <h4>Records</h4>
        </div>
        <div class="card-body">
            <table class="table table-striped table-responsive">
                <thead id="table-ic-head"></thead>
                <tbody id="record-list"></tbody>
              </table>
        </div>
    </div>
    <div id="simpleModal" class="_modal">
      <div class="modal_content">
        <span id="closeBtn" class="close_btn">&times;</span>
            <div class="modal-header">
                <center>
                    <p>Sugget Record Edit</p>
                </center>
            </div>
            <div class="modal-body">
                <form id="modal-form" method="POST" action="{{url('/postSuggestions')}}">
                    @csrf
                  <div class="form-group">
                    <label>id</label>
                    <input type="text" id="modal-id" name="id" class="form-control"/>
                </div>
                    <div class="form-group">
                        <label >Ic9 code</label>
                        <input type="text" id="modal-ic9-code" name="ic9code" class="form-control" disabled/>
                    </div>
                    <div class="form-group">
                        <label >Ic9 description</label>
                        <input type="text" id="modal-ic9-description" name="ic9descriptionsuggest" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label >Ic10 code</label>
                      <input type="text" id="modal-ic10-code" name="ic10code" class="form-control" disabled/>
                  </div>
                  <div class="form-group">
                      <label >Ic10 description</label>
                      <input type="text" id="modal-ic10-description" name="ic10descriptionsuggest" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label >Reason</label>
                    <input type="text" id="modal-reason" name="reason" class="form-control" />
                </div>
                    <input type="submit" value="Submit Suggestion" class="btn btn-primary btn-block" id="" />
                </form>
            </div>
    </div>
    </div>
    </div>
@endsection