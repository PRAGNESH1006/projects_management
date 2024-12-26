<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateClientDetailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company_name' => 'required|String',
            'contact_number' => 'required|String',
        ];
    }
    public function getInsertableFields(): array
    {
        return [
            'user_id' => Auth::user()->id,
            'company_name' => $this->input('company_name'),
            'contact_number' => $this->input('contact_number'),
        ];
    }
}
