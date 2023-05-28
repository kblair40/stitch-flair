<script lang="ts" setup>
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { useEtsyAuthStore } from '../../store/etsyAuthStore';
import type { AuthState } from '../../store/etsyAuthStore';


const store = useEtsyAuthStore();
const config = useRuntimeConfig();

const clientID = config.ETSY_KEYSTRING;
const clientVerifier = '<same as the verifier used to create the code_challenge>';
const redirectUri = 'http://localhost:3000/oauth/redirect';

const initAuth = async () => {
    const { data } = await useFetch('/api/etsy-auth')
    console.log('\nAUTH DATA:', data.value);
    store.setState(data.value as AuthState);
    // console.log('VALUES:', { codeVerifier, codeChallenge, state })
    const { codeVerifier, codeChallenge, state } = data.value as AuthState;
    if (!codeVerifier || !codeChallenge || !state) {
        return;
    }

    const requestConfig: AxiosRequestConfig = {
        params: {
            response_type: 'code',
            client_id: clientID,
            redirect_uri: redirectUri,
            // scope: [],
            scope: encodeURIComponent('listings_r recommend_r shops_r'),
            // code_verifier: codeVerifier,
            code_challenge: codeChallenge,
            code_challenge_method: 's256',
            // code_verifier: data.value.codeVerifier!,
        }
    }

    try {
        const { data } = await useFetch('/api/connect', {
            params: {
                response_type: 'code',
                client_id: clientID,
                redirect_uri: redirectUri,
                // scope: [],
                scope: 'listings_r recommend_r shops_r',
                // code_verifier: codeVerifier,
                code_challenge: codeChallenge,
                code_challenge_method: 's256',
                // code_verifier: data.value.codeVerifier!,
            }
        })
        // const res = await axios.get('https://www.etsy.com/oauth/connect', {
        //     params: {
        //         response_type: 'code',
        //         client_id: clientID,
        //         redirect_uri: redirectUri,
        //         // scope: [],
        //         scope: 'listings_r recommend_r shops_r',
        //         // code_verifier: codeVerifier,
        //         code_challenge: codeChallenge,
        //         code_challenge_method: 's256',
        //         // code_verifier: data.value.codeVerifier!,
        //     },
        // })

        console.log('\nINIT AUTH RES:', data.value, '\n')
    } catch (e) {
        console.log('INIT AUTH FAILED:', e);
    }
}
</script>

<template>
    <Page>
        <PageTitle>OAuth</PageTitle>

        <div class="flex justify-center h-full border pt-8">
            <button @click="initAuth" class="w-32 h-10 rounded-md border bg-slate-50 font-medium">Login</button>
        </div>

    </Page>
</template>