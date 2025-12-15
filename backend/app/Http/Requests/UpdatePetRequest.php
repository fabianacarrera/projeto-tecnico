<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => 'sometimes|string|min:2|max:255',
            'tipo' => 'sometimes|string|min:2|max:255',
            'idade_anos' => 'sometimes|integer|min:0',
            'idade_meses' => 'sometimes|integer|min:0|max:11',
            'sexo' => 'sometimes|in:macho,femea',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.min' => 'Nome deve ter pelo menos 2 caracteres',
            'tipo.min' => 'Tipo deve ter pelo menos 2 caracteres',
            'idade_anos.min' => 'Idade em anos deve ser maior ou igual a 0',
            'idade_meses.min' => 'Idade em meses deve ser maior ou igual a 0',
            'idade_meses.max' => 'Idade em meses deve ser no máximo 11',
            'sexo.in' => 'Sexo deve ser macho ou fêmea',
        ];
    }
}
