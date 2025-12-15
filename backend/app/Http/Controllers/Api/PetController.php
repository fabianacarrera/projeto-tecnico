<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePetRequest;
use App\Http\Requests\UpdatePetRequest;
use App\Models\Pet;
use Illuminate\Http\Request;

class PetController extends Controller
{
    public function index(Request $request)
    {
        $pets = $request->user()->pets;

        return response()->json([
            'pets' => $pets
        ]);
    }

    public function store(StorePetRequest $request)
    {
        $data = $request->validated();

        if (!isset($data['idade_meses'])) {
            $data['idade_meses'] = 0;
        }

        $pet = $request->user()->pets()->create($data);

        return response()->json([
            'message' => 'Pet cadastrado com sucesso',
            'pet' => $pet
        ], 201);
    }

    public function show(Request $request, string $id)
    {
        $pet = $request->user()->pets()->find($id);

        if (!$pet) {
            return response()->json([
                'message' => 'Pet não encontrado'
            ], 404);
        }

        return response()->json([
            'pet' => $pet
        ]);
    }

    public function update(UpdatePetRequest $request, string $id)
    {
        $pet = $request->user()->pets()->find($id);

        if (!$pet) {
            return response()->json([
                'message' => 'Pet não encontrado'
            ], 404);
        }

        $pet->update($request->validated());

        return response()->json([
            'message' => 'Pet atualizado com sucesso',
            'pet' => $pet
        ]);
    }

    public function destroy(Request $request, string $id)
    {
        $pet = $request->user()->pets()->find($id);

        if (!$pet) {
            return response()->json([
                'message' => 'Pet não encontrado'
            ], 404);
        }

        $pet->delete();

        return response()->json([
            'message' => 'Pet excluído com sucesso'
        ]);
    }
}
