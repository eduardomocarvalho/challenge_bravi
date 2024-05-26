<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\Contact;
use Illuminate\Http\Request;
class PersonController extends Controller
{
    public function index()
    {
        return Person::with('contacts')->get();
    }

    public function store(Request $request)
    {
        $person = Person::create($request->only('name'));
        $contacts = $request->input('contacts', []);
        foreach ($contacts as $contact) {
            $person->contacts()->create($contact);
        }
        return response()->json($person->load('contacts'), 201);
    }

    public function show($id)
    {
        return Person::with('contacts')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $person = Person::findOrFail($id);
        $person->update($request->only('name'));

        $person->contacts()->delete();
        $contacts = $request->input('contacts', []);
        foreach ($contacts as $contact) {
            $person->contacts()->create($contact);
        }

        return response()->json($person->load('contacts'), 200);
    }

    public function destroy($id)
    {
        Person::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
