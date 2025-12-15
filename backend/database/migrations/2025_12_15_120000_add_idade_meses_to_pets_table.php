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
        Schema::table('pets', function (Blueprint $table) {
            // Renomear coluna idade para idade_anos
            $table->renameColumn('idade', 'idade_anos');
        });

        Schema::table('pets', function (Blueprint $table) {
            // Adicionar coluna idade_meses após idade_anos
            $table->integer('idade_meses')->default(0)->after('idade_anos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pets', function (Blueprint $table) {
            $table->dropColumn('idade_meses');
        });

        Schema::table('pets', function (Blueprint $table) {
            $table->renameColumn('idade_anos', 'idade');
        });
    }
};
