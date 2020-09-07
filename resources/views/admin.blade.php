@extends('layouts.app')

@section('content')

<div class="container">
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

    <div class="card mt-4">
      <div class="card-header records_header">
          <h4>Suggestions</h4>
      </div>
      <div class="card-body">
          <table class="table table-striped table-responsive">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ICD-9</th>
                <th>ICD-9-Description</th>
                <th></th>
                <th>DescriptionChange</th>
                <th>ICD-10</th>
                <th>ICD-10-Description</th>
                <th></th>
                <th>DescriptionChange</th>
                <th>Id</th>
                <th>Actions</th>
              </tr>
              </thead>

              <tbody id="suggestion-list">
                @foreach($suggestions as $key => $suggestion)
                <tr>
                   <td>{{$suggestion->name}}</td>
                   <td>{{$suggestion->ic9code}}</td>
                   <td class="text-danger">{{$suggestion->ic9description}}</td>
                   <td><i class="fas fa-arrow-right text-primary"></i></td> 
                   <td class="text-primary">{{$suggestion->ic9descriptionsuggest}}</td>
                   <td>{{$suggestion->ic10code}}</td>
                   <td class="text-danger">{{$suggestion->ic10description}}</td>
                   <td><i class="fas fa-arrow-right text-primary"></i></td> 
                   <td class="text-primary">{{$suggestion->ic10descriptionsuggest}}</td>
                   <td>{{$suggestion->record_id}}</td>
                <td><a href="/admin/updateRecord?id={{$suggestion->id}}&ic9descriptionsuggest={{$suggestion->ic9descriptionsuggest}}&ic10descriptionsuggest={{$suggestion->ic10descriptionsuggest}}&record_id={{$suggestion->record_id}}"
                   class = "btn btn-success btn-sm m-1 edit" ><i class="fas fa-check edit"></i></a> 
                   <a href="/admin/suggestion/{{$suggestion->id}}" class = "btn btn-danger btn-sm m-1 delete"><i class="fas fa-times"></i></a>
                  </td>
                </tr>
              @endforeach
            </tbody>
            </table>
      </div>
  </div>
</div>

@endsection