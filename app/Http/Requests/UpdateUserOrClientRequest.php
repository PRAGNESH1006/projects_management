<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use App\Enums\RoleEnum;


class UpdateUserOrClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check() && Auth::user();
    }

    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($this->route('user')),
            ],
            'role' => ['required', new Enum(RoleEnum::class)]
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

    public function getUpdateableFields(): array
    {
        $updateData = [
            'name' => $this->input('name'),
            'email' => $this->input('email'),
            'role' => $this->input('role'),
            'updated_by' => Auth::user()->id,
        ];

        if ($this->input('role') === 'client') {
            $updateData['company_name'] = $this->input('company_name');
            $updateData['contact_number'] = $this->input('contact_number');
        }

        return $updateData;
    }
}
