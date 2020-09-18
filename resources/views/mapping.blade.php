@extends('layouts.app')

@section('content')

<div class="container mt-4">
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
           
                <select class="form-control drop_down_items" id="category-selector-mapping">
                  <option value="ICD-9-BPA code">ICD-9</option>
                  <option value="ICD-10 code">ICD-10</option>
                </select>
            
          </div>
        <input type="text" class="form-group" id='search-bar-map' placeholder="Input code and press search....">
        <div class="card searh_button" id='search_button_map'>
            <div class="search_button_items">
                <i class="fas fa-search"></i> 
            <label>Search</label>
            </div>
        </div>
       
      </div>
      <div class="card display_none" id="form-mapping">
        <div class="card-header">
            Edit Mapping
        </div>
        <div class="card-body">
            <form  method="POST" action="{{url('/postSuggestions')}}">
                @csrf
                <input type="hidden" id="mapping-id" name="id" class="form-control"/>
            
                <div class="form-group">
                    <label >Ic9 code</label>
                    <input type="hidden" id="mapping-ic9-code" name="ic9code" class="form-control" />
                    <input type="text" id="mapping-ic9-code-input" name="ic9codeinput" class="form-control" />
                </div>
                <div class="form-group">
                    <label >Ic9 description</label>
                    <input type="hidden" id="mapping-ic9-description" name="ic9description" class="form-control" />
                    <input type="text" id="mapping-ic9-description-input" name="ic9descriptionsuggest" class="form-control" />
                </div>
                <div class="form-group">
                  <label >Ic10am code</label>
                  <input type="hidden" id="mapping-ic10am-code" name="ic10code" class="form-control"/>
                  <input type="text" id="mapping-ic10am-code-input" name="ic10codeinput" class="form-control" />
              </div>
              <div class="form-group">
                  <label >Ic10am description</label>
                  <input type="hidden" id="mapping-ic10am-description" name="ic10description" class="form-control" />
                  <input type="text" id="mapping-ic10am-description-input" name="ic10descriptionsuggest" class="form-control" />
              </div>
              <div class="form-group">
                <label >Reason</label>
                <textarea name="reason" id="" rows="5" class="form-control" placeholder="Please input reason for change" id="mapping-reason"  ></textarea>
            </div>
                <input type="submit" value="Submit Suggestion" class="btn btn-primary btn-block" id="" />
            </form>
        </div>
    </div>
    <div class="card display_none" id="form-mapping2">
      <div class="card-header">
          Edit Mapping
      </div>
      <div class="card-body">
          <form class="justify-content-md-center" method="POST" action="{{url('/postAmSuggestions')}}">
              @csrf
              <input type="hidden" id="mapping-id2" name="id" class="form-control"/>
              <div class="form-group">
                  <label >Ic10 code</label>
                  <input type="hidden" id="mapping-ic10-code" name="ic10code" class="form-control" />
                  <input type="text" id="mapping-ic10-code-input" name="ic10codeinput" class="form-control"/>
              </div>
              <div class="form-group">
                  <label >Ic10 description</label>
                  <input type="hidden" id="mapping-ic10-description" name="ic10description" class="form-control" />
                  <input type="text" id="mapping-ic10-description-input" name="ic10descriptionsuggest" class="form-control" />
              </div>
              <div class="form-group">
                <label >Ic10AM code</label>
                <input type="hidden" id="mapping-ic10am-code2" name="ic10amcode" class="form-control" />
                <input type="text" id="mapping-ic10am-code2-input" name="ic10amcodeinput" class="form-control"/>
            </div>
            <div class="form-group">
                <label >Ic10AM description</label>
                <input type="hidden" id="mapping-ic10am-description2" name="ic10amdescription" class="form-control" />
                <input type="text" id="mapping-ic10am-description2-input" name="ic10amdescriptionsuggest" class="form-control" />
            </div>
            <div class="form-group">
              <label >Reason</label>
              <textarea name="reason" id="" rows="5" class="form-control" placeholder="Please input reason for change" id="mapping-reason2" ></textarea>
          </div>
              <input type="submit" value="Submit Suggestion" class="btn btn-primary btn-block" id="" />
          </form>
      </div>
      </div>
</div>

@endsection