<?php

namespace Database\Seeders;

use App\Models\ClientDetail;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ClientDetailSeeder extends Seeder
{
    public function run(): void
    {
        $clients = User::where('role', 'client')->get();

        if ($clients->count() > 0) {
            foreach ($clients as $client) {
                ClientDetail::updateOrCreate(
                    [
                        'user_id' => $client->id,
                    ],
                    [
                        'id' => Str::uuid(),
                        'company_name' => $this->generateCompanyName($client->id),
                        'contact_number' => $this->generateContactNumber(),
                    ]
                );
            }
        }
    }

    private function generateCompanyName($clientId): string
    {
        $clientIdHash = hexdec(substr(md5($clientId), 0, 8));

        $companyNames = [
            'Tech Solutions Ltd',
            'Global Enterprises Inc',
            'Innovative Designs Co',
            'Creative Ventures Group',
            'Future Technologies LLC',
        ];

        return $companyNames[$clientIdHash % count($companyNames)];
    }

    private function generateContactNumber(): string
    {
        return '555-' . rand(1000, 9999) . '-' . rand(1000, 9999);
    }
}