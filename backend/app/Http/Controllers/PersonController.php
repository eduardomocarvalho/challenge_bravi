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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contacts' => 'required|array|min:1',
            'contacts.*.type' => 'required|string|max:255',
            'contacts.*.value' => 'required|string|max:255',
        ], [
            'contacts.required' => 'At least one contact is required.',
            'contacts.*.type.required' => 'The type (email, telefone, or whatsapp) is required.',
            'contacts.*.value.required' => 'The value (email, telefone, or whatsapp) is required.',
        ]);

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

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contacts' => 'required|array|min:1',
            'contacts.*.type' => 'required|string|max:255',
            'contacts.*.value' => 'required|string|max:255',
        ], [
            'contacts.required' => 'At least one contact is required.',
            'contacts.*.type.required' => 'The type (email, telefone, or whatsapp) is required.',
            'contacts.*.value.required' => 'The value (email, telefone, or whatsapp) is required.',
        ]);
        
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
