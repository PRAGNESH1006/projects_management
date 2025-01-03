<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Enum;

class StoreUserOrClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check() && Auth::user();
    }

    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => ['required', new Enum(RoleEnum::class)],
        ];
        if ($this->input('role') === 'client') {
            $rules['company_name'] = 'required|string|max:255';
            $rules['contact_number'] = 'required|numeric|digits:10';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'company_name.required' => 'The company name is required for clients.',
            'contact_number.required' => 'The contact number is required for clients.',
            'contact_number.numeric' => 'The contact number must be a valid number.',
            'contact_number.digits' => 'The contact number must be exactly 10 digits.',
        ];
    }

    public function getInsertableFields(): array
    {
        $insertData = [
            'name' => $this->input('name'),
            'email' => $this->input('email'),
            'password' => bcrypt($this->input('password')),
            'role' => $this->input('role'),
            'created_by' => Auth::user()->id,
            'updated_by' => null,
        ];

        if ($this->input('role') === 'client') {
            $insertData['company_name'] = $this->input('company_name');
            $insertData['contact_number'] = $this->input('contact_number');
        }

        return $insertData;
    }
}
