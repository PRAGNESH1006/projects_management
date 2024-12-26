<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use Exception;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Throwable;

class StoreUserOrClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check() && Auth::user();
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => ['required', new Enum(RoleEnum::class)],
            'company_name' => 'required_if:role,client|string|max:255',
            'contact_number' => 'required_if:role,client|string|max:20',
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

    // protected function failedValidation(Validator $validator)
    // {
    //     throw new HttpResponseException(response()->json($validator->errors(), 422));
    // }
}
