<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Http\Requests\StoreUserOrClientRequest;
use App\Http\Requests\UpdateUserOrClientRequest;
use App\Repositories\ClientDetailRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class UserController extends BaseController
{
    protected $userRepository;
    protected $clientDetailRepository;

    public function __construct(UserRepository $userRepository, ClientDetailRepository $clientDetailRepository)
    {
        $this->userRepository = $userRepository;
        $this->clientDetailRepository = $clientDetailRepository;
    }

    public function index(): Response
    {
        $users = $this->userRepository->getPaginate(8, relations: ['clientDetail', 'updatedBy']);
        return Inertia::render('Users/Index', compact('users'));
    }

    public function show(User $user): Response
    {
        $user = $user->load('clientDetail', 'updatedBy');

        return Inertia::render('Users/Show', compact('user'));
    }


    public function store(StoreUserOrClientRequest $request)
    {
        DB::beginTransaction();
        try {
            $userData = $request->getInsertableFields();
            $user = $this->userRepository->store($userData);
            if ($user->role->value === 'client') {
                $clientDetailData = [
                    'user_id' => $user->id,
                    'company_name' => $request->input('company_name'),
                    'contact_number' => $request->input('contact_number'),
                ];
                $this->clientDetailRepository->store($clientDetailData);
            }
            DB::commit();
            if ($user->role->value === 'admin') {
                return $this->sendRedirectResponse(route('users.index'), $user->role->value . ' Details Added Successfully');
            } else {
                return $this->sendRedirectResponse(route($user->role->value . '.index'), $user->role->value . ' Details Added Successfully');
            }
        } catch (Throwable $e) {
            Log::error('Transaction Failed:', ['error' => $e->getMessage()]);
            DB::rollBack();
            return $this->sendRedirectError(route('users.index'), 'Failed to add ' . $user->role->value . ' details: ' . $e->getMessage());
        }
    }

    public function edit(User $user): Response
    {
        $clientDetail = $user->clientDetail;
        return Inertia::render('Users/Edit', compact('user', 'clientDetail'));
    }

    public function update(User $user, UpdateUserOrClientRequest $request)
    {
        DB::beginTransaction();
        try {
            $userData = $request->getUpdateableFields();
            $user = $this->userRepository->update($user->id, $userData);
            if ($user->role->value === 'client') {
                $clientDetailId = $this->clientDetailRepository->getClientDetailByUserId($user->id)->first()->id;
                $clientDetailData = [
                    'user_id' => $user->id,
                    'company_name' => $request->input('company_name'),
                    'contact_number' => $request->input('contact_number'),
                ];
                $this->clientDetailRepository->update($clientDetailId, $clientDetailData);
            }
            DB::commit();

            return $this->sendRedirectResponse(route($user->role->value . '.index', [$user->id]), $user->role->value . ' details Updated Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectError(route('users.edit', $user->id), 'Failed to update' . $user->role->value . ': ' . $e->getMessage());
        }
    }



    public function destroy(User $user)
    {
        DB::beginTransaction();
        try {
            $this->userRepository->destroy($user->id);
            DB::commit();
            return $this->sendRedirectResponse(route($user->role->value . '.index'), $user->role->value . ' Deleted Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectError(route('users.index'), 'Failed to delete ' . $user->role->value . ': ' . $e->getMessage());
        }
    }
}
