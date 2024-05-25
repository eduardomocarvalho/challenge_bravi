<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    public function index()
    {
        return Person::with('contacts')->get();
    }

    public function store(Request $request)
    {
        $person = Person::create($request->all());
        return response()->json($person, 201);
    }

    public function show($id)
    {
        return Person::with('contacts')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $person = Person::findOrFail($id);
        $person->update($request->all());
        return response()->json($person, 200);
    }

    public function destroy($id)
    {
        Person::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
