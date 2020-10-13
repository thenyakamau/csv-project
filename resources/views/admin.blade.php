@extends('layouts.app')

@section('content')
<div class="container-fluid row justify-content-center">
   <div class="col-lg-9 col-md-9">
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
    <div class="card">
      <div class="card-header records_header">
          <h4>Admin Panel</h4>
          <form action="{{url('/admin/upload')}}" method="GET">
            <button type="submit" class="btn btn-outline-primary">Upload File</button>
          </form>
      </div>
  <div class="card-body">
      Welcome to the admin panel where you can view suggestion sent over by users and decide whether to approve or deny them as per your 
      desire. Please take detailed notice into the content uploaded for the safety of others.
    </div>
  </div>
   </div>

    <div class="col-lg-9 col-md-9">
      <div class="card mt-4 ">
      <div class="card-header records_header">
          <h4>Suggestions</h4>
          <div class="admin_suggest_widgets">
            <select class="form-control drop_down_items" id="suggestion-selector">
              <option value="ICD-9-mode">ICD-9</option>
              <option value="ICD-10-mode">ICD-10</option>
              <option value="ICD-10am-mode">ICD-10AM</option>
            </select>
            <a href="/admin/getSuggestionsExport" class="btn btn-primary" id="ic-link">DownLoad</a>
            <a href="/admin/getSuggestionsNineExport" class="btn btn-primary am_download" id="ic-nine-link">DownLoad</a>
            <a href="/admin/getSuggestionsTenExport" class="btn btn-primary am_download" id="ic-am-link">DownLoad</a>
          </div>
      </div>
      <div class="card-body">
          <div id="suggest-table">
            <table class="table table-striped table-responsive w-100 d-block d-md-table" >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ic9 Code</th>
                <th>Ic9Description</th>
                <th></th>
                <th>DescriptionChange</th>
                <th>Ic10AMCode</th>
                <th>Ic10AMDescription</th>
                <th></th>
                <th>DescriptionChange</th>
                <th>Reason</th>
                <th>Accept/Reject</th>
              </tr>
              </thead>

              <tbody id="suggestion-list">
                @foreach($suggestions as $key => $suggestion)
                <tr>
                   <td>{{$suggestion->name}}</td>
                   <td class="text-danger">{{$suggestion->ic9code}}</td>
                   <td class="text-danger">{{$suggestion->ic9description}}</td>
                   <td><i class="fas fa-arrow-right text-primary"></i></td> 
                   <td class="text-primary">{{$suggestion->ic9descriptionsuggest}}</td>
                   <td class="text-primary">{{$suggestion->ic10code}}</td>
                   <td class="text-danger">{{$suggestion->ic10description}}</td>
                   <td><i class="fas fa-arrow-right text-primary"></i></td> 
                   <td class="text-primary">{{$suggestion->ic10descriptionsuggest}}</td>
                   <td>{{$suggestion->reason}}</td>
                   <td class="display_none">{{$suggestion->id}}</td>
                <td class="row justify-content-sm-around">
                  <a href="/admin/updateRecord?id={{$suggestion->id}}&ic9codesuggest={{$suggestion->ic9codesuggest}}&ic10codesuggest={{$suggestion->ic10codesuggest}}&ic9descriptionsuggest={{$suggestion->ic9descriptionsuggest}}&ic10descriptionsuggest={{$suggestion->ic10descriptionsuggest}}&record_id={{$suggestion->record_id}}"
                   class = "btn btn-success btn-sm m-1 edit" ><i class="fas fa-check edit"></i></a> 
                   {{-- <div class="btn btn-success btn-sm m-1 edit"  id="btn_edit_ic9"><i class="fas fa-check edit" ></i></div> --}}
                   <a href="/admin/suggestion/{{$suggestion->id}}" class = "btn btn-danger btn-sm m-1 delete"><i class="fas fa-times"></i></a>
                  </td>
                </tr>
              @endforeach
            </tbody>
            </table>
          </div>

           <div class="display_none" id="suggest-nine-table">
            <table class="table table-striped table-responsive  w-100 d-block d-md-table" >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mapping</th>
                <th>Ic9Description</th>
                <th></th>
                <th>DescriptionChange</th>
                <th>Ic10Code</th>
                <th>Ic10Description</th>
                <th></th>
                <th>DescriptionChange</th>
                <th>Reason</th>
                <th>Accept/Reject</th>
              </tr>
              </thead>

              <tbody id="suggestion-list2">
                @foreach($suggestions10 as $key => $suggestion)
                <tr>
                   <td>{{$suggestion->name}}</td>
                   <td class="text-danger">{{$suggestion->ic9code}}</td>
                   <td class="text-danger">{{$suggestion->ic9description}}</td>
                   <td><i class="fas fa-arrow-right text-primary"></i></td> 
                   <td class="text-primary">{{$suggestion->ic9descriptionsuggest}}</td>
                   <td class="text-primary">{{$suggestion->ic10code}}</td>
                   <td class="text-danger">{{$suggestion->ic10description}}</td>
                   <td><i class="fas fa-arrow-right text-primary"></i></td> 
                   <td class="text-primary">{{$suggestion->ic10descriptionsuggest}}</td>
                   <td class="text-primary">{{$suggestion->reason}}</td>
                <td><a href="/admin/updateRecordNine?id={{$suggestion->id}}&ic9codesuggest={{$suggestion->ic9codesuggest}}&ic10codesuggest={{$suggestion->ic10codesuggest}}&ic9descriptionsuggest={{$suggestion->ic9descriptionsuggest}}&ic10descriptionsuggest={{$suggestion->ic10descriptionsuggest}}&record_id={{$suggestion->record_id}}"
                   class = "btn btn-success btn-sm m-1 edit" ><i class="fas fa-check edit"></i></a> 
                   {{-- <div class="btn btn-success btn-sm m-1 edit"  id="btn_edit_ic10"><i class="fas fa-check edit" ></i></div> --}}
                   <a href="/admin/suggestion_nine/{{$suggestion->id}}" class = "btn btn-danger btn-sm m-1 delete"><i class="fas fa-times"></i></a>
                  </td>
                </tr>
              @endforeach
            </tbody>
            </table>
           </div>

            <div class="display_none" id="suggest-ten-table">
              <table class="table table-striped table-responsive w-100 d-block d-md-table" >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mapping</th>
                    <th>MappingChange</th>
                  <th>IC10Description</th>
                  <th></th>
                  <th>DescriptionChange</th>
                  <th>IC10AMDescription</th>
                  <th></th>
                  <th>DescriptionChange</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
                </thead>
  
                <tbody id="suggestion-list3">
                  @foreach($suggestionsAm as $key => $suggestionam)
                  <tr>
                     <td>{{$suggestionam->name}}</td>
                     <td class="text-danger">{{$suggestionam->ic10code}}->{{$suggestionam->ic10amcode}}</td>
                     <td class="text-primary">{{$suggestionam->ic10codesuggest}}->{{$suggestionam->ic10amcodesuggest}}</td>
                     <td class="text-danger">{{$suggestionam->ic10amcodesuggest}}</td>
                     <td><i class="fas fa-arrow-right text-primary"></i></td> 
                     <td class="text-primary">{{$suggestionam->ic10descriptionsuggest}}</td>
                     <td class="text-danger">{{$suggestionam->ic10description}}</td>
                     <td><i class="fas fa-arrow-right text-primary"></i></td> 
                     <td class="text-primary">{{$suggestionam->ic10amdescription}}</td>
                     <td class="text-primary">{{$suggestionam->reason}}</td>
                  <td><a href="/admin/updateRecordTen?id={{$suggestionam->id}}&ic10codesuggest={{$suggestionam->ic10codesuggest}}&ic10amcodesuggest={{$suggestionam->ic10amcodesuggest}}&ic10descriptionsuggest={{$suggestionam->ic10descriptionsuggest}}&ic10amdescription={{$suggestionam->ic10amdescription}}&record_id={{$suggestionam->record_id}}"
                     class = "btn btn-success btn-sm m-1 edit" ><i class="fas fa-check edit"></i></a> 
                     <a href="/admin/suggestion_ten/{{$suggestionam->id}}" class = "btn btn-danger btn-sm m-1 delete"><i class="fas fa-times"></i></a>
                    </td>
                  </tr>
                @endforeach
              </tbody>
              </table>
            </div>
      </div>
  </div>
</div>
<div id="_simpleModal" class="_modal">
  <div class="col-md-4 modal_content">
    <span id="_closeModalBtn" class="close_btn">&times;</span>
    <div class="modal-header">
      <center>
        <h3>Warning</h3>
      </center>
    </div>
    <div class="modal-body">
      <label id="_modal_text"></label>
      <div class="row justify-content-end">
        <buttton class="btn btn-primary">Submit</buttton>
      </div>
    </div>
  </div>
</div>
</div>
@endsection