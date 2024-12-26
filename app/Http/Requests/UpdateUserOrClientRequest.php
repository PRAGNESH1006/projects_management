<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateUserOrClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check() && Auth::user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($this->route('user')),  // Ignore the current user's email
            ],
            'role' => 'required|in:admin,employee,client',
            'company_name' => 'required_if:role,client|string|max:255',  // For client role, validate company_name
            'contact_number' => 'required_if:role,client|string|max:20',  // For client role, validate contact_number
        ];
    }

    /**
     * Get the fields that should be updated in the database.
     *
     * @return array
     */
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
