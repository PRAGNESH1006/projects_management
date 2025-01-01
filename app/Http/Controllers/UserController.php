<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Http\Requests\StoreUserOrClientRequest;
use App\Http\Requests\UpdateUserOrClientRequest;
use App\Repositories\ClientDetailRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
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
        $users = $this->userRepository->getAll();
        return Inertia::render('Users/Index', compact('users'));
    }

    public function show(User $user): Response
    {
        return Inertia::render('Users/Show', compact('user'));
    }

    public function create(Request $request ): Response
    {
        $role = $request->query('role', '');
        $validRoles = ['admin', 'employee', 'client'];
        if (!in_array($role, $validRoles)) {
            $role = '';
        }

        return Inertia::render('Users/Create' ,compact('role'));
    }

    public function store(StoreUserOrClientRequest $request)
    {
        DB::beginTransaction();
        try {
            $userData = $request->getInsertableFields();
            $user = $this->userRepository->store($userData);

            if ($user->role === 'client') {
                $clientDetailData = [
                    'user_id' => $user->id,
                    'company_name' => $request->input('company_name'),
                    'contact_number' => $request->input('contact_number'),
                ];
                $this->clientDetailRepository->store($clientDetailData);
            }
            DB::commit();

            if ($user->role->value == 'admin') {
                return $this->sendRedirectResponse(route('users.index'), 'User and Client Details Added Successfully');
            } else {
                return $this->sendRedirectResponse(route($user->role->value . '.index'), 'User and Client Details Added Successfully');
            }
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectError(route('users.create'), 'Failed to add user and client details: ' . $e->getMessage());
        }
    }

    public function edit(User $user): Response
    {
        $clientDetail = $user->clientDetail;
        return Inertia::render('users.edit', compact('user', 'clientDetail'));
    }

    public function update(User $user, UpdateUserOrClientRequest $request)
    {
        DB::beginTransaction();
        try {
            $userData = $request->getUpdateableFields();
            $user = $this->userRepository->update($user->id, $userData);
            if ($user->role === 'client') {
                $clientDetailData = [
                    'user_id' => $user->id,
                    'company_name' => $request->input('company_name'),
                    'contact_number' => $request->input('contact_number'),
                ];
                $this->clientDetailRepository->update($user->id, $clientDetailData);
            }
            DB::commit();

            return $this->sendRedirectResponse(route('users.show', [$user->id]), 'User Updated Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectError(route('users.edit', $user->id), 'Failed to update user: ' . $e->getMessage());
        }
    }



    public function destroy(User $user)
    {
        DB::beginTransaction();
        try {
            $this->userRepository->destroy($user->id);
            DB::commit();
            return $this->sendRedirectResponse(route($user->role->value . '.index'), 'User Deleted Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectError(route('users.index'), 'Failed to delete user: ' . $e->getMessage());
        }
    }
}
