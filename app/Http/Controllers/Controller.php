<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function successResponse($message) {
        return response()->json([
            'status' => 200,
            'message' => $message,
        ], 200);
    }

    public function errorResponse($message, $statusCode = 400, $statusType = 400) {
        return response()->json([
            'status' => $statusType,
            'message' => $message,
        ], $statusCode);
    }

    public function customResponse($jsonError = [], $statusCode = 200) {
        return response()->json($jsonError, $statusCode);
    }
}
