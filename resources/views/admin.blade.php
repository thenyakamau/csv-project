@extends('layouts.app')

@section('content')
<div class="container-fluid justify-content-center admin_container">
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
            <a href="/admin/getSuggestionsTenExport" class="btn btn-primary am_download" id="ic-nine-link">DownLoad</a>
            <a href="/admin/getSuggestionsTenExport" class="btn btn-primary am_download" id="ic-am-link">DownLoad</a>
          </div>
      </div>
      <div class="card-body">
          <table class="table table-striped table-responsive" id="suggest-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mapping</th>
                  <th>MappingChange</th>
                <th>Ic9Description</th>
                <th></th>
                <th>DescriptionChange</th>
                <th>Ic10amDescription</th>
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
                   <td class="text-danger">{{$suggestion->ic9code}}->{{$suggestion->ic10code}}</td>
                   <td class="text-primary">{{$suggestion->ic9codesuggest}}->{{$suggestion->ic10codesuggest}}</td>
                   <td class="text-danger">{{$suggestion->ic9description}}</td>
                   <td><i class="fas fa-arrow-right text-primary"></i></td> 
                   <td class="text-primary">{{$suggestion->ic9descriptionsuggest}}</td>
                   <td class="text-danger">{{$suggestion->ic10description}}</td>
                   <td><i class="fas fa-arrow-right text-primary"></i></td> 
                   <td class="text-primary">{{$suggestion->ic10descriptionsuggest}}</td>
                   <td class="text-primary">{{$suggestion->reason}}</td>
                <td><a href="/admin/updateRecord?id={{$suggestion->id}}&ic9codesuggest={{$suggestion->ic9codesuggest}}&ic10codesuggest={{$suggestion->ic10codesuggest}}&ic9descriptionsuggest={{$suggestion->ic9descriptionsuggest}}&ic10descriptionsuggest={{$suggestion->ic10descriptionsuggest}}&record_id={{$suggestion->record_id}}"
                   class = "btn btn-success btn-sm m-1 edit" ><i class="fas fa-check edit"></i></a> 
                   <a href="/admin/suggestion/{{$suggestion->id}}" class = "btn btn-danger btn-sm m-1 delete"><i class="fas fa-times"></i></a>
                  </td>
                </tr>
              @endforeach
            </tbody>
            </table>

            <table class="table table-striped table-responsive display_none" id="suggest-nine-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mapping</th>
                  <th>MappingChange</th>
                <th>Ic9Description</th>
                <th></th>
                <th>DescriptionChange</th>
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
                   <td class="text-danger">{{$suggestion->ic9code}}->{{$suggestion->ic10code}}</td>
                   <td class="text-primary">{{$suggestion->ic9codesuggest}}->{{$suggestion->ic10codesuggest}}</td>
                   <td class="text-danger">{{$suggestion->ic9description}}</td>
                   <td><i class="fas fa-arrow-right text-primary"></i></td> 
                   <td class="text-primary">{{$suggestion->ic9descriptionsuggest}}</td>
                   <td class="text-danger">{{$suggestion->ic10description}}</td>
                   <td><i class="fas fa-arrow-right text-primary"></i></td> 
                   <td class="text-primary">{{$suggestion->ic10descriptionsuggest}}</td>
                   <td class="text-primary">{{$suggestion->reason}}</td>
                <td><a href="/admin/updateRecord?id={{$suggestion->id}}&ic9codesuggest={{$suggestion->ic9codesuggest}}&ic10codesuggest={{$suggestion->ic10codesuggest}}&ic9descriptionsuggest={{$suggestion->ic9descriptionsuggest}}&ic10descriptionsuggest={{$suggestion->ic10descriptionsuggest}}&record_id={{$suggestion->record_id}}"
                   class = "btn btn-success btn-sm m-1 edit" ><i class="fas fa-check edit"></i></a> 
                   <a href="/admin/suggestion/{{$suggestion->id}}" class = "btn btn-danger btn-sm m-1 delete"><i class="fas fa-times"></i></a>
                  </td>
                </tr>
              @endforeach
            </tbody>
            </table>

            <table class="table table-striped table-responsive suggest-ten-table" id="suggest-ten-table">
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
                @foreach($suggestionsAm as $key => $suggestion)
                <tr>
                   <td>{{$suggestion->name}}</td>
                   <td class="text-danger">{{$suggestion->ic10code}}->{{$suggestion->ic10amcode}}</td>
                   <td class="text-primary">{{$suggestion->ic10codesuggest}}->{{$suggestion->ic10amcodesuggest}}</td>
                   <td class="text-danger">{{$suggestion->ic10amcodesuggest}}</td>
                   <td><i class="fas fa-arrow-right text-primary"></i></td> 
                   <td class="text-primary">{{$suggestion->ic10descriptionsuggest}}</td>
                   <td class="text-danger">{{$suggestion->ic10description}}</td>
                   <td><i class="fas fa-arrow-right text-primary"></i></td> 
                   <td class="text-primary">{{$suggestion->ic10amdescription}}</td>
                   <td class="text-primary">{{$suggestion->reason}}</td>
                <td><a href="/admin/updateRecordTen?id={{$suggestion->id}}&ic10codesuggest={{$suggestion->ic10codesuggest}}&ic10amcodesuggest={{$suggestion->ic10amcodesuggest}}&ic10descriptionsuggest={{$suggestion->ic10descriptionsuggest}}&ic10amdescription={{$suggestion->ic10amdescription}}&record_id={{$suggestion->record_id}}"
                   class = "btn btn-success btn-sm m-1 edit" ><i class="fas fa-check edit"></i></a> 
                   <a href="/admin/suggestion_ten/{{$suggestion->id}}" class = "btn btn-danger btn-sm m-1 delete"><i class="fas fa-times"></i></a>
                  </td>
                </tr>
              @endforeach
            </tbody>
            </table>
      </div>
  </div>
</div>
</div>
@endsection