<?php

return [
    'service' => 'Recaptcha', // options: Recaptcha / Hcaptcha / Turnstile / Altcha
    'sitekey' => env('CAPTCHA_SITEKEY', '6Lf0mw8sAAAAADkGviuxBVJzrty5PA6DM0udctkF'),
    'secret' => env('CAPTCHA_SECRET', '6Lf0mw8sAAAAAOfLnSjsqkqiqTGk0X0dTsWNValR'),
    'collections' => [],
    'forms' => ['contact_form', 'proposal_form'],
    'user_login' => false,
    'user_registration' => false,
    'disclaimer' =>'J\'accepte la politique de confidentialité',
    'invisible' => true,
    'hide_badge' => true,
    'enable_api_routes' => false,
    'custom_should_verify' => null,
];
