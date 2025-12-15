<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|string|min:2|max:255',
            'tipo' => 'required|string|min:2|max:255',
            'idade_anos' => 'required|integer|min:0',
            'idade_meses' => 'nullable|integer|min:0|max:11',
            'sexo' => 'required|in:macho,femea',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'Nome é obrigatório',
            'nome.min' => 'Nome deve ter pelo menos 2 caracteres',
            'tipo.required' => 'Tipo é obrigatório',
            'tipo.min' => 'Tipo deve ter pelo menos 2 caracteres',
            'idade_anos.required' => 'Idade em anos é obrigatória',
            'idade_anos.min' => 'Idade em anos deve ser maior ou igual a 0',
            'idade_meses.min' => 'Idade em meses deve ser maior ou igual a 0',
            'idade_meses.max' => 'Idade em meses deve ser no máximo 11',
            'sexo.required' => 'Sexo é obrigatório',
            'sexo.in' => 'Sexo deve ser macho ou fêmea',
        ];
    }
}
