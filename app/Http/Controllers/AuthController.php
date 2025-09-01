<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * แสดงหน้า login
     * ถ้าล็อกอินแล้ว redirect ไป dashboard อัตโนมัติ
     */
    public function showLogin()
    {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Login');
    }

    /**
     * ตรวจสอบข้อมูล login
     */
    public function login(Request $request)
    {
        // validate input
        $credentials = $request->validate([
            'email' => ['required','email'],
            'password' => ['required'],
        ]);

        // ตรวจสอบ credential
        if (Auth::attempt($credentials)) {
            // regenerate session เพื่อความปลอดภัย
            $request->session()->regenerate();

            // login สำเร็จ → redirect ไป dashboard หรือ intended page
            return redirect()->intended(route('dashboard'));
        }

        // login fail → กลับหน้า login พร้อม error message
        return back()->withErrors([
            'email' => 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        ])->onlyInput('email');
    }

    /**
     * logout ออกจากระบบ
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
