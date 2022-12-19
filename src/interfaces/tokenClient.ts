interface OverridableTokenClientConfig {
    /**
     * Optional. A space-delimited, case-sensitive list of prompts to present the user.
     */
    prompt?: string;
    /**
     * Optional. If set to false,
     * [more granular Google Account permissions](https://developers.googleblog.com/2018/10/more-granular-google-account.html)
     * will be disabled for clients created before 2019.
     * No effect for newer clients, since more granular permissions is always enabled for them.
     */
    enable_serial_consent?: boolean;
    /**
     * Optional. If your application knows which user should authorize the request,
     * it can use this property to provide a hint to Google.
     *  The email address for the target user. For more information,
     * see the [login_hint](https://developers.google.com/identity/protocols/oauth2/openid-connect#authenticationuriparameters) field in the OpenID Connect docs.
     */
    hint?: string;
    /**
     * Optional. Not recommended. Specifies any string value that your
     * application uses to maintain state between your authorization request
     * and the authorization server's response.
     */
    state?: string;
}

export interface ITokenClient {
    requestAccessToken: (overridableClientConfig?: OverridableTokenClientConfig) => void;
    callback?: () => void;
}
