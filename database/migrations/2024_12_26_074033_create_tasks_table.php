<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->text('description');
            $table->string('status');
            $table->foreignUuid('project_id')->constrained('projects')
                  ->onDelete('cascade');
            $table->foreignUuid('assigned_to')->constrained('users')
                  ->onDelete('cascade'); 
            $table->date('start_date');
            $table->date('end_date');
            $table->foreignUuid('created_by')->constrained('users')
                  ->onDelete('cascade');
            $table->foreignUuid('updated_by')->nullable()->constrained('users')
                  ->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};