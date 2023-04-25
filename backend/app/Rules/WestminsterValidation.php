<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class WestminsterValidation implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $domainPart = explode('@', $value)[1] ?? null;

        if ($domainPart == 'my.westminster.ac.uk' || $domainPart == 'westminster.ac.uk') {
            return true;
        }
    
        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Not a university of Westminster email.';
    }
}
