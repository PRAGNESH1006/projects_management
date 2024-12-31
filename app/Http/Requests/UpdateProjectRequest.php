<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255', Rule::unique('projects')->ignore($this->project)],
            'description' => 'required|string',
            'client_id' => 'required|string|exists:users,id',
            'start_date' => 'required|date',
            'employee_ids' => 'required|array',
            'employee_ids.*' => 'exists:users,id',
            'end_date' => 'required|date|after_or_equal:start_date',
        ];
    }

    public function getInsertableFields(): array
    {
        return [
            'title' => $this->input('title'),
            'description' => $this->input('description'),
            'client_id' => $this->input('client_id'),
            'updated_by' => Auth::user()->id,
            'start_date' => $this->input('start_date'),
            'end_date' => $this->input('end_date'),
        ];
    }
}
